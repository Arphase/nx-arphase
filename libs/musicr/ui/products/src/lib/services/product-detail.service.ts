import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '@musicr/domain';
import { BehaviorSubject, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { filterNil, filterNilArray, mapToSelectOptions } from '@arphase/ui';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  productSubject = new BehaviorSubject<Product>(null);
  product$ = this.productSubject.asObservable();
  priceOptions$ = this.product$.pipe(
    map(product => product?.priceOptions),
    filterNilArray(),
    mapToSelectOptions(priceOption => ({ label: `${priceOption.name}`, value: priceOption.id }))
  );

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(event => {
          if (event instanceof NavigationEnd) {
            const id = Number(event.url.substring(event.url.indexOf('product/') + 8));
            return this.getProduct(id);
          }
        }),
        take(1)
      )
      .subscribe(product => {
        this.productSubject.next(product);
      });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/mrlApi/products/${id}`);
  }
}
