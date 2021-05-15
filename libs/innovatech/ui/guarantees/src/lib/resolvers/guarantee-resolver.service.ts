import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Guarantee } from '@innovatech/common/domain';
import { Observable, of } from 'rxjs';

import { GuaranteeCollectionService } from '../services/guarantee-collection.service';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeResolverService implements Resolve<Guarantee> {
  constructor(private guaranteeCollectionService: GuaranteeCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Guarantee> {
    const id = route.paramMap.get('id');
    let guarantee$: Observable<Guarantee> = of(null);
    id
      ? (guarantee$ = this.guaranteeCollectionService.getByKey(Number(id)))
      : this.guaranteeCollectionService.removeOneFromCache(null);

    return guarantee$;
  }
}
