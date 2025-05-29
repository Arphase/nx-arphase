import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OrderCollectionService } from '../../services/order-collection.service';

@Component({
  selector: 'mrl-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDetailContainerComponent {
  currentItem$ = this.orderCollectionService.currentItem$;
  constructor(private orderCollectionService: OrderCollectionService) {}
}
