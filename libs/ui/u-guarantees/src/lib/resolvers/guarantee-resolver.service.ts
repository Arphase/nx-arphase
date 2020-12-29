import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Guarantee, Product } from '@ivt/c-data';
import { GuaranteeCollectionService, ProductCollectionService } from '@ivt/u-state';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeResolverService implements Resolve<[Guarantee, Product[]]> {
  constructor(
    private guaranteeCollectionService: GuaranteeCollectionService,
    private productCollectionService: ProductCollectionService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<[Guarantee, Product[]]> {
    const id = route.paramMap.get('id');
    let guarantee$: Observable<Guarantee> = of(null);
    id
      ? (guarantee$ = this.guaranteeCollectionService.getByKey(Number(id)))
      : this.guaranteeCollectionService.removeOneFromCache(null);
    const products$ = this.productCollectionService.getAll();

    return forkJoin([guarantee$, products$]);
  }
}
