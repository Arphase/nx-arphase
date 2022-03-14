import { OrderProductAdditionalOption } from './order-product-additional-option.model';
import { Product } from './product.model';

export interface AdditionalOption {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  price: number;
  productId: number;
  product: Product;
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
