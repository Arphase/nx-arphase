import { ApsColumns } from '@arphase/ui/core';
import { OrderStatus } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export const columns: ApsColumns = [
  {
    label: 'Folio',
    prop: 'order.id',
    colSizes: {
      xs: 5,
      md: 2,
    },
  },
  {
    label: 'Cliente',
    prop: 'customer.firstName',
    colSizes: {
      xs: 12,
      md: 4,
      lg: 4,
    },
  },
  {
    label: 'Tipo de Orden',
    prop: 'order.orderType',
    colSizes: {
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
    label: 'Total',
    prop: 'order.total',
    colSizes: {
      md: 4,
      lg: 4,
    },
  },
  {
    label: 'Estatus',
    prop: 'order.status',
    colSizes: {
      xs: 7,
      md: 6,
      lg: 6,
    },
  },
];

export const dateTypeOptions: NzSelectOptionInterface[] = [
  { label: 'Pedido', value: 'createdAt' },
  { label: 'Evento', value: 'startDate' },
];

export const colorMaps: Record<OrderStatus, string> = {
  [OrderStatus.done]: 'success',
  [OrderStatus.quoted]: 'warning',
  [OrderStatus.notSpecified]: 'error',
  [OrderStatus.inProcess]: 'default',
};

export const iconMaps: Record<OrderStatus, string> = {
  [OrderStatus.done]: 'check-circle',
  [OrderStatus.quoted]: 'exclamation-circle',
  [OrderStatus.notSpecified]: 'close-circle',
  [OrderStatus.inProcess]: 'sync',
};
