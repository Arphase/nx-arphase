import { AdditionalOption } from './additional-option.model';
import { OrderProduct } from './order-product.model';
import { Photo } from './photo.model';
import { PriceOption } from './price-option.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id?: number;
  name: string;
  price: number;
  disclaimer?: string;
  description?: string;
  productComponents?: string[];
  photos?: Photo[];
  subcategoryId?: number;
  subcategory?: Subcategory;
  additionalOptions?: AdditionalOption[];
  orderProducts?: OrderProduct[];
  priceOptions?: PriceOption[];
}