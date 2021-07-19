import { OrderProductAdditionalOption } from '../../orders/models/order-product-additional-option.model';
import { Product } from './product.model';

export interface AdditionalOption {
  id: number;
  name: string;
  price: number;
  productId: number;
  product: Product;
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
