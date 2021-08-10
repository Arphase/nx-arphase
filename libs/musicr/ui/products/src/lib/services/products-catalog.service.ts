import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Product } from '@musicr/domain';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsCatalogService {
  id: number;
  isSubCategory: boolean;
  productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  titleSubject = new BehaviorSubject<string>(null);
  title$ = this.titleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.id = Number(event.url.substring(event.url.indexOf('category/') + 9));
        this.isSubCategory = event.url.includes('sub');

        this.getTitle()
          .pipe(
            map(response => response.results[0].name),
            tap(title => {
              this.titleSubject.next(title);
            })
          )
          .subscribe();
        this.getProducts()
          .pipe(
            map(response => response.results),
            tap(products => {
              this.productsSubject.next(products);
            })
          )
          .subscribe();
      }
    });
  }

  getProducts() {
    const params = this.isSubCategory ? { subcategoryId: this.id } : { categoryId: this.id };
    return this.http.get<any>(`/mrlApi/products/`, { params });
  }

  getTitle() {
    const params = { id: this.id };
    return this.isSubCategory
      ? this.http.get<any>(`/mrlApi/subcategories/`, { params })
      : this.http.get<any>(`/mrlApi/categories/`, { params });
  }
}
