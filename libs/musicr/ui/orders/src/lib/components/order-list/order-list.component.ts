import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Order, orderTypeLabels, OrderTypes } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'mrl-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent extends ApsListComponent<Order> {
  orderTypeLabels = orderTypeLabels;
  orderTypeOptions: NzSelectOptionInterface[] = [
    { label: orderTypeLabels[OrderTypes.purchase], value: OrderTypes.purchase },
    { label: orderTypeLabels[OrderTypes.quote], value: OrderTypes.quote },
  ];
  dateTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Pedido', value: 'createdAt' },
    { label: 'Evento', value: 'startDate' },
  ];

  columns: ApsColumns = [
    {
      label: 'Folio',
      prop: 'order.id',
      colSizes: {
        xs: 8,
        md: 2,
      },
    },
    {
      label: 'Cliente',
      prop: 'customer.firstName',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Tipo de Orden',
      prop: 'order.orderType',
      colSizes: {
        xs: 16,
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Fecha evento',
      prop: 'socialEvent.date',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Fecha pedido',
      prop: 'order.createdAt',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Total',
      prop: 'order.total',
      colSizes: {
        md: 6,
        lg: 6,
      },
    },
  ];

  updateOrderTypeFilter(orderType: OrderTypes): void {
    this.filterItems.emit({ orderType });
  }
}
