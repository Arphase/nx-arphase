import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { Order } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class OrderCollectionService extends ApsCollectionService<Order> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Order', serviceElementsFactory);
  }
}
