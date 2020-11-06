import { Injectable } from '@angular/core';
import { Company } from '@ivt/c-data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class CompanyCollectionService extends IvtCollectionService<
  Company
> {
  constructor(
    protected serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Company', serviceElementsFactory);
  }
}
