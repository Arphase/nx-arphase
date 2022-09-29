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
}

export enum OrderTypes {
  quote = 'quote',
  purchase = 'purchase',
}

export const orderTypeLabels: Record<OrderTypes, string> = {
  [OrderTypes.purchase]: 'Compra',
  [OrderTypes.quote]: 'Cotización',
};
