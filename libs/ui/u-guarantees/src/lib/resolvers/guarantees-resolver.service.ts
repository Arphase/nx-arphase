import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Guarantee, IvtQueryParams } from '@ivt/c-data';
import { GuaranteeCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuaranteesResolverService implements Resolve<Guarantee[]> {
  constructor(private guaranteeCollectionService: GuaranteeCollectionService) {}

  resolve(): Observable<Guarantee[]> {
    const queryParams: IvtQueryParams = { resetList: true };
    return this.guaranteeCollectionService.getWithQuery(queryParams as any);
  }
}
