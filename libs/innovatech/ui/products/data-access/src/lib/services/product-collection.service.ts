import { Injectable } from '@angular/core';
import { Product } from '@innovatech/common/domain';
import { mapToSelectOptions } from '@innovatech/common/utils';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends IvtCollectionService<Product> {
  options$ = this.entities$.pipe(mapToSelectOptions(product => ({ label: product.name, value: product.id })));
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
