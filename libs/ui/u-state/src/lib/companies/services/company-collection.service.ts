import { Injectable } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions } from '@ivt/c-utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core/services/collection.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyCollectionService extends IvtCollectionService<Company> {
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
