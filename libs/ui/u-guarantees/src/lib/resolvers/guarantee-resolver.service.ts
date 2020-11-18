import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Guarantee } from '@ivt/c-data';
import { GuaranteeCollectionService, ProductCollectionService } from '@ivt/u-state';
import { Action } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeResolverService implements Resolve<Action> {
  constructor(private guaranteeCollectionService: GuaranteeCollectionService,
              private productCollectionService: ProductCollectionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    let guarantee$ = of(null);
    id
      ? (guarantee$ = this.guaranteeCollectionService.getByKey(+id))
      : this.guaranteeCollectionService.removeOneFromCache(null);
      const products$ = this.productCollectionService.getAll();
    return forkJoin([guarantee$, products$]);
  }
}
