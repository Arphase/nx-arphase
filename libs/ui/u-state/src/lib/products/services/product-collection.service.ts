import { Injectable } from '@angular/core';
import { Product } from '@innovatech/common/domain';
import { mapToSelectOptions } from '@ivt/c-utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends IvtCollectionService<Product> {
  options$ = this.entities$.pipe(mapToSelectOptions(product => ({ label: product.name, value: product.id })));
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
