import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsCollectionResponse } from '@arphase/common';
import { Category, Product, Subcategory } from '@musicr/domain';
import { BehaviorSubject, filter, forkJoin, Observable, Subscription, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsCatalogService {
  productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  titleSubject = new BehaviorSubject<string>(null);
  title$ = this.titleSubject.asObservable();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  routerEventSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  listenToRouterEvents(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
    this.routerEventSubscription = this.route.params
      .pipe(
        filter(params => params.id),
        switchMap(({ id }) => {
          this.loadingSubject.next(true);
          const url = this.router.url;
          const isSubCategory = url.includes('sub');
          const title = this.getTitle(id, isSubCategory);
          const products = this.getProducts(id, isSubCategory);
          return forkJoin([title, products]);
        })
      )
      .subscribe(response => {
        this.titleSubject.next(response[0].name);
        this.productsSubject.next(response[1].results);
        this.loadingSubject.next(false);
      });
  }

  getProducts(id: number, isSubCategory: boolean): Observable<ApsCollectionResponse<Product>> {
    const params = isSubCategory ? { subcategoryId: id } : { categoryId: id };
    return this.http.get<ApsCollectionResponse<Product>>(`/mrlApi/products`, { params });
  }

  getTitle(id: number, isSubCategory: boolean): Observable<Category | Subcategory> {
    return isSubCategory
      ? this.http.get<Subcategory>(`/mrlApi/subcategories/${id}`)
      : this.http.get<Category>(`/mrlApi/categories/${id}`);
  }
}
