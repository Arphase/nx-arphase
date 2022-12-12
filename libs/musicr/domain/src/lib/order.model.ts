import { Customer } from './customer.model';
import { OrderProduct } from './order-product.model';
import { SocialEvent } from './social-event.model';

export interface Order {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  customerId?: number;
  customer: Customer;
  socialEventId?: number;
  socialEvent: SocialEvent;
  total: number;
  orderProducts: OrderProduct[];
  orderType?: OrderTypes;
  status?: OrderStatus;
}

export enum OrderTypes {
  quote = 'quote',
  purchase = 'purchase',
}

export const orderTypeLabels: Record<OrderTypes, string> = {
  [OrderTypes.purchase]: 'Compra',
  [OrderTypes.quote]: 'Cotización',
};

export const orderTypeOptions: { label: string; value: string }[] = [
  { label: orderTypeLabels[OrderTypes.purchase], value: OrderTypes.purchase },
  { label: orderTypeLabels[OrderTypes.quote], value: OrderTypes.quote },
];

export enum OrderStatus {
  quoted = 'quoted',
  notSpecified = 'notSpecified',
  done = 'done',
  inProcess = 'inProcess',
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.quoted]: 'Cotizado',
  [OrderStatus.notSpecified]: 'No concretado',
  [OrderStatus.done]: 'Realizado',
  [OrderStatus.inProcess]: 'En proceso',
};

export const orderStatusOptions: { label: string; value: string }[] = [
  { label: orderStatusLabels[OrderStatus.quoted], value: OrderStatus.quoted },
  { label: orderStatusLabels[OrderStatus.notSpecified], value: OrderStatus.notSpecified },
  { label: orderStatusLabels[OrderStatus.done], value: OrderStatus.done },
  { label: orderStatusLabels[OrderStatus.inProcess], value: OrderStatus.inProcess },
];
