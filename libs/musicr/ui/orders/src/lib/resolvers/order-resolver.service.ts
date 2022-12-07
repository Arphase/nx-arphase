import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Order } from '@musicr/domain';

import { OrderCollectionService } from '../services/order-collection.service';

@Injectable({ providedIn: 'root' })
export class OrderResolverService extends ApsEntityResolverService<Order> {
  constructor(protected orderCollectionService: OrderCollectionService) {
    super(orderCollectionService);
  }
}
