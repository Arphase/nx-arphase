import { Injectable } from '@angular/core';
import { Company } from '@ivt/c-data';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@ivt/c-utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class CompanyFilterCollectionService extends IvtCollectionService<Company> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(company => ({
      label: `${company.businessName}`,
      value: company.id,
    })),
    sortSelectOptionsAlphabetical()
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CompanyFilter', serviceElementsFactory);
  }
}
