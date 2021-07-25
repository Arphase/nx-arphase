import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui';
import { Company } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions } from '@innovatech/common/utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CompanyCollectionService extends ApsCollectionService<Company> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(company => ({
      label: `${company.businessName}`,
      value: company.id,
    }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Company', serviceElementsFactory);
  }
}
