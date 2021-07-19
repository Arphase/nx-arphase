import { Customer } from '../../customers';
import { SocialEvent } from '../../social-events';
import { OrderProduct } from './order-product.model';

export interface Order {
  id: number;
  customerId?: number;
  customer: Customer;
  socialEventId?: number;
  socialEvent: SocialEvent;
  total: number;
  orderProducts: OrderProduct[];
}
