import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsCollectionResponse, ApsCollectionResponseInfo, SortDirection } from '@arphase/common';
import { GtagService } from '@arphase/ui/gtag';
import { Category, Product, Subcategory } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class ProductsCatalogService {
  products = signal<Product[]>([]);
  productsInfo = signal<ApsCollectionResponseInfo>(null);
  title = signal<string>('');
  loading = signal<boolean>(false);

  get isSubCategory(): boolean {
    return this.router.url.includes('sub');
  }

  get currentId(): number {
    return Number(this.route.snapshot.params.id);
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
          this.productsInfo.set(null);
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
      .subscribe(([currentCategory, { results, info }]) => {
        this.loading.set(false);
        const { category, name } = currentCategory as Subcategory;
        const location_id = category ? category.name : name;
        this.title.set(name);
        this.products.set(results);
        this.productsInfo.set(info);
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

  getProducts(id: number, queryParams?: QueryParams): Observable<ApsCollectionResponse<Product>> {
    const sortingParams = { sort: 'product.position', direction: SortDirection.descend };
    const params = this.isSubCategory ? { subcategoryId: id } : { categoryId: id };
    return this.http.get<ApsCollectionResponse<Product>>(`/mrlApi/products`, {
      params: { ...(queryParams ?? {}), ...params, ...sortingParams, pageSize: 1000 },
    });
  }

  getCategory(id: number): Observable<Category | Subcategory> {
    const params = new HttpParams({ fromObject: { relations: '' } });
    return this.isSubCategory
      ? this.http.get<Subcategory>(`/mrlApi/subcategories/${id}`, { params })
      : this.http.get<Category>(`/mrlApi/categories/${id}`, { params });
  }
}
