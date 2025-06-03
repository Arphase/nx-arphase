import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsCollectionResponse, ApsQueryParams } from '@arphase/common';
import { GtagService } from '@arphase/ui/gtag';
import { Category, Product, Subcategory } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { firstValueFrom, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class ProductsCatalogService {
  products = signal<Product[]>([]);
  title = signal<string>('');
  loading = signal<boolean>(false);
  loadingSort = signal<boolean>(false);
  currentCategoryId = signal<number>(0);

  get isSubCategory(): boolean {
    return this.router.url.includes('sub');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private gtagService: GtagService,
  ) {
    this.listenToRouterEvents();
  }

  listenToRouterEvents(): void {
    this.route.params
      .pipe(
        filter(params => params.id),
        switchMap(({ id }) => {
          this.currentCategoryId.set(id);
          this.loading.set(true);
          const category = this.getCategory(id);
          const productsResponse = this.getProducts(id);
          return forkJoin([category, productsResponse]);
        }),
        untilDestroyed(this),
        catchError(() => {
          this.loading.set(false);
          return forkJoin([of({}), of({ results: [], info: null })]);
        }),
      )
      .subscribe(([currentCategory, { results }]) => {
        this.loading.set(false);
        const { category, name } = currentCategory as Subcategory;
        const location_id = category ? category.name : name;
        this.title.set(name);
        this.products.set(results);
        this.gtagService.event('page_view', {
          send_to: 'AW-697727149',
          value: 1,
          items: [
            {
              id: name,
              location_id,
              google_business_vertical: 'custom',
            },
          ],
        });
      });
  }

  getProducts(id: number, queryParams?: ApsQueryParams): Observable<ApsCollectionResponse<Product>> {
    const sortingParams = { sort: 'product.popularity', direction: 'ascend' };
    const params = this.isSubCategory ? { subcategoryId: id } : { categoryId: id };
    return this.http.get<ApsCollectionResponse<Product>>(`/mrlApi/products`, {
      params: { ...params, ...sortingParams, ...(queryParams ?? {}), pageSize: 1000 },
    });
  }

  getCategory(id: number): Observable<Category | Subcategory> {
    const params = new HttpParams({ fromObject: { relations: '' } });
    return this.isSubCategory
      ? this.http.get<Subcategory>(`/mrlApi/subcategories/${id}`, { params })
      : this.http.get<Category>(`/mrlApi/categories/${id}`, { params });
  }

  async sort(sortOption: string): Promise<void> {
    this.loadingSort.set(true);
    const [sort, direction] = String(sortOption).split('|');
    const sortingParams = { sort: sort.trim(), direction: direction.trim() };
    const { results } = await firstValueFrom(this.getProducts(this.currentCategoryId(), sortingParams));
    this.products.set(results);
    this.loadingSort.set(false);
  }

  async filter(queryParams: ApsQueryParams): Promise<void> {
    this.loadingSort.set(true);
    const { results } = await firstValueFrom(this.getProducts(this.currentCategoryId(), queryParams));
    this.products.set(results);
    this.loadingSort.set(false);
  }
}
