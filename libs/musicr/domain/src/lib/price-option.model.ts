import { OrderProduct } from './order-product.model';
import { Photo } from './photo.model';
import { Product } from './product.model';

export interface PriceOption {
  id: number;
  name: string;
  price: number;
  productId: number;
  photos: Photo[];
  product: Product;
  orderProducts: OrderProduct[];
}
