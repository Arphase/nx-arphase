import { Customer } from './customer.model';
import { OrderProduct } from './order-product.model';
import { SocialEvent } from './social-event.model';

export interface Order {
  id?: number;
  customerId?: number;
  customer: Customer;
  socialEventId?: number;
  socialEvent: SocialEvent;
  total: number;
  orderProducts: OrderProduct[];
}
