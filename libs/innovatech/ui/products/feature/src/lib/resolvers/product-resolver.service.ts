import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<Product> {
  constructor(private productCollectionService: ProductCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = Number(route.paramMap.get('id'));
    let product$ = of(null);
    id
      ? (product$ = this.productCollectionService.getByKey(id))
      : this.productCollectionService.removeOneFromCache(null);
    return product$;
  }
}