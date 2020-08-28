import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Guarantee } from '@ivt/data';
import { GuaranteeCollectionService } from '@ivt/state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeResolverService implements Resolve<Guarantee> {
  constructor(private guaranteeCollectionService: GuaranteeCollectionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Guarantee> {
    const id = route.paramMap.get('id');
    let guarantee$ = of(null);
    id
      ? (guarantee$ = this.guaranteeCollectionService.getByKey(+id))
      : this.guaranteeCollectionService.removeOneFromCache(null);
    return guarantee$;
  }
}
