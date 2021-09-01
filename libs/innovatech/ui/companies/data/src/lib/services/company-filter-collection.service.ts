import { Injectable } from '@angular/core';
import { ApsCollectionService, filterNilArray, mapToSelectOptions } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class CompanyFilterCollectionService extends ApsCollectionService<Company> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(company => ({
      label: `${company.businessName}`,
      value: company.id,
    }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CompanyFilter', serviceElementsFactory);
  }
}
