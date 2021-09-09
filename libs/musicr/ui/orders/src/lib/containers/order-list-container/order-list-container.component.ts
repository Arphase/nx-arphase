import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Order } from '@musicr/domain';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderDataService } from '../../services/order-data.service';

@Component({
  selector: 'mrl-order-list-container',
  templateUrl: './order-list-container.component.html',
  styleUrls: ['./order-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListContainerComponent extends ApsListContainerComponent<Order> {
  constructor(protected orderCollectionService: OrderCollectionService, protected orderDataService: OrderDataService) {
    super(orderCollectionService, orderDataService);
  }
}
