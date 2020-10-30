import { Injectable } from '@angular/core';
import { Product } from '@ivt/c-data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends IvtCollectionService<Product> {
  constructor(
    protected serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Product', serviceElementsFactory);
  }
}
