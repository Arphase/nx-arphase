import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {
  productSubject = new BehaviorSubject<Product>(null);
  product$ = this.productSubject.asObservable();
  priceOptions$ = this.product$.pipe(
    map(product => product?.priceOptions),
    filterNilArray(),
    mapToSelectOptions(priceOption => ({ label: `${priceOption.name}`, value: priceOption.id }))
  );

  constructor(private http: HttpClient) {}

  getProduct(id: number): void {
    this.http
      .get<Product>(`/mrlApi/products/${id}`)
      .pipe(take(1))
      .subscribe(product => this.productSubject.next(product));
  }
}
