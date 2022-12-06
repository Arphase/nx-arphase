import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

@Injectable()
export class ProductDetailService {
  productSubject = new BehaviorSubject<Product>(null);
  product$ = this.productSubject.asObservable();
  priceOptions$ = this.product$.pipe(
    map(product => product?.priceOptions),
    filterNilArray(),
    map(options => options.sort((a, b) => a.price - b.price)),
    mapToSelectOptions(priceOption => ({ label: priceOption.name, value: priceOption.id }))
  );
  additionalOptions$ = this.product$.pipe(
    map(product => product?.additionalOptions),
    filterNilArray(),
    map(options => options.sort((a, b) => a.price - b.price))
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
