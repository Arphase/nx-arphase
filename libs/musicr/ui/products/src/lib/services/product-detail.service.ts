import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '@musicr/domain';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui';

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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const id = Number(event.url.substring(event.url.indexOf('product/') + 8));
        this.getProduct(id)
          .pipe(
            tap(product => {
              this.productSubject.next(product);
            })
          )
          .subscribe();
      }
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/mrlApi/products/${id}`);
  }
}
