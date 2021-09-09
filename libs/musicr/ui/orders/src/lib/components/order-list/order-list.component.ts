import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Order } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'mrl-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent extends ApsListComponent<Order> {
  dateTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Pedido', value: 'createdAt' },
    { label: 'Evento', value: 'startDate' },
  ];

  columns: ApsColumns = [
    {
      label: 'Cliente',
      prop: 'customer.firstName',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Evento',
      prop: 'socialEvent.name',
      colSizes: {
        xs: 24,
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Fecha evento',
      prop: 'socialEvent.startDate',
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
        md: 8,
        lg: 8,
      },
    },
  ];
}
