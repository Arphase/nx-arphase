import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends ApsCollectionService<Product> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
