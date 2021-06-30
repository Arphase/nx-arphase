import { OrderProduct } from '../../orders';
import { Product } from './product.model';

export interface PriceOption {
  id: number;
  name: string;
  price: number;
  productId: number;
  product: Product;
  orderProducts: OrderProduct[];
}
