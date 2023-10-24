import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsCollectionResponse, ApsCollectionResponseInfo, SortDirection } from '@arphase/common';
import { GtagService } from '@arphase/ui/gtag';
import { Category, Product, Subcategory } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class ProductsCatalogService {
  productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  productsInfoSubject = new BehaviorSubject<ApsCollectionResponseInfo>(null);
  productsInfo$ = this.productsInfoSubject.asObservable();
  titleSubject = new BehaviorSubject<string>(null);
  title$ = this.titleSubject.asObservable();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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
    private gtagService: GtagService
  ) {
    this.listenToRouterEvents();
  }

  listenToRouterEvents(): void {
    this.route.params
      .pipe(
        filter(params => params.id),
        switchMap(({ id }) => {
          this.productsInfoSubject.next(null);
          this.loadingSubject.next(true);
          const category = this.getCategory(id);
          const productsResponse = this.getProducts(id);
          return forkJoin([category, productsResponse]);
        }),
        untilDestroyed(this),
        catchError(() => {
          this.loadingSubject.next(false);
          return forkJoin([of({}), of({ results: [], info: null })]);
        })
      )
      .subscribe(([currentCategory, { results, info }]) => {
        this.loadingSubject.next(false);
        const { category, name } = currentCategory as Subcategory;
        const location_id = category ? category.name : name;
        this.titleSubject.next(name);
        this.productsSubject.next(results);
        this.productsInfoSubject.next(info);
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
