import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IvtQueryParams, Product } from '@ivt/c-data';
import { ProductCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productCollectionService: ProductCollectionService) {}

  resolve(): Observable<Product[]> {
    const queryParams: IvtQueryParams = { resetList: String(true) };
    return this.productCollectionService.getWithQuery(queryParams);
  }
}
