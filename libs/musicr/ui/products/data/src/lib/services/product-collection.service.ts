import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/utils';
import { Product } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProductCollectionService extends ApsCollectionService<Product> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(({ name, id }) => ({ label: `${name}`, value: id })),
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
