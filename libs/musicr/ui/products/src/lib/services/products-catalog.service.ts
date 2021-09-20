import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApsCollectionResponse } from '@arphase/common';
import { Category, Product, Subcategory } from '@musicr/domain';
import { BehaviorSubject, filter, forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsCatalogService {
  productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  titleSubject = new BehaviorSubject<string>(null);
  title$ = this.titleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(event => {
          if (event instanceof NavigationEnd) {
            const id = Number(event.url.substring(event.url.indexOf('category/') + 9));
            const isSubCategory = event.url.includes('sub');
            const title = this.getTitle(id, isSubCategory);
            const products = this.getProducts(id, isSubCategory);
            return forkJoin([title, products]);
          }
        })
      )
      .subscribe(response => {
        this.titleSubject.next(response[0].name);
        this.productsSubject.next(response[1].results);
      });
  }

  getProducts(id: number, isSubCategory: boolean): Observable<ApsCollectionResponse<Product>> {
    const params = isSubCategory ? { subcategoryId: id } : { categoryId: id };
    return this.http.get<ApsCollectionResponse<Product>>(`/mrlApi/products/`, { params });
  }

  getTitle(id: number, isSubCategory: boolean): Observable<Category | Subcategory> {
    return isSubCategory
      ? this.http.get<Subcategory>(`/mrlApi/subcategories/${id}`)
      : this.http.get<Category>(`/mrlApi/categories/${id}`);
  }
}
