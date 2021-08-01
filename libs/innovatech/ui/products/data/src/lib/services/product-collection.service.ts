import { Injectable } from '@angular/core';
import { ApsCollectionService, mapToSelectOptions } from '@arphase/ui';
import { Product } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProductCollectionService extends ApsCollectionService<Product> {
  options$ = this.entities$.pipe(mapToSelectOptions(product => ({ label: product.name, value: product.id })));
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
