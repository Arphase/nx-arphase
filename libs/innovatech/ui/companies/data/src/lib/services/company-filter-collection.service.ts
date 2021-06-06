import { Injectable } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions } from '@innovatech/common/utils';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CompanyFilterCollectionService extends IvtCollectionService<Company> {
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
