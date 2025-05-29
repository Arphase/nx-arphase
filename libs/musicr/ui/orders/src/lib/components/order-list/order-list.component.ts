import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import {
  Order,
  OrderStatus,
  orderStatusLabels,
  orderStatusOptions,
  orderTypeLabels,
  orderTypeOptions,
  OrderTypes,
} from '@musicr/domain';

import { colorMaps, columns, dateTypeOptions, iconMaps } from './order-list.constants';

@Component({
  selector: 'mrl-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderListComponent extends ApsListComponent<Order> {
  orderTypeLabels = orderTypeLabels;
  orderTypeOptions = orderTypeOptions;
  orderStatusLabels = orderStatusLabels;
  orderStatusOptions = orderStatusOptions;
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  colorMaps = colorMaps;
  iconMaps = iconMaps;

  @Output() downloadPdf = new EventEmitter<number>();

  updateOrderTypeFilter(orderType: OrderTypes): void {
    this.filterItems.emit({ orderType });
  }

  updateOrderStatusFilter(status: OrderStatus): void {
    this.filterItems.emit({ status });
  }

  onChangeStatus(id: number, status: OrderStatus): void {
    this.edit.emit({ id, status });
  }
}
