import { Category } from './category.model';
import { PriceOption } from './price-option.model';
import { Product } from './product.model';

export interface Photo {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  url: string;
  key: string;
  order?: number;
  productId?: number;
  product?: Product;
  priceOptionId?: number;
  priceOption?: PriceOption;
}
