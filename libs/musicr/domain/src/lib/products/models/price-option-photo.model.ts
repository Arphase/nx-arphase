import { Product } from './product.model';

export interface PriceOptionPhoto {
  id: number;
  url: string;
  order: number;
  productId: number;
  product: Product;
}
