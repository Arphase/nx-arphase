import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { BehaviorSubject, finalize, map, take } from 'rxjs';

@Injectable()
export class ProductDetailService {
  productSubject = new BehaviorSubject<Product>(null);
  product$ = this.productSubject.asObservable();
  priceOptions$ = this.product$.pipe(
    map(product => product?.priceOptions),
    filterNilArray(),
    mapToSelectOptions(priceOption => ({ label: `${priceOption.name}`, value: priceOption.id }))
  );
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProduct(id: number): void {
    this.loadingSubject.next(true);
    this.http
      .get<Product>(`/mrlApi/products/${id}`)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(product => this.productSubject.next(product));
  }
}
