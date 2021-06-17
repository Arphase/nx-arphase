import { PriceOption, Product } from '../../products';
import { OrderProductAdditionalOption } from './order-product-additional-option.model';
import { Order } from './order.model';

export interface OrderProduct {
  id: number;
  orderId: number;
  order: Order;
  productId: number;
  product: Product;
  amount: number;
  priceOptionId?: number;
  priceOption?: PriceOption;
  price: number;
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
