import { Injectable } from '@angular/core';
import { formatCurrency } from '@arphase/common';
import { ApsCollectionService } from '@arphase/ui/data';
import { mapToSelectOptions } from '@arphase/ui/utils';
import { Product } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProductCollectionService extends ApsCollectionService<Product> {
  options$ = this.entities$.pipe(
    mapToSelectOptions(({ name, price, id }) => ({ label: `${name} - ${formatCurrency(price)}`, value: id }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
