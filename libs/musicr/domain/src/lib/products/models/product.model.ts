import { OrderProduct } from '../../orders';
import { AdditionalOption } from './additional-option.model';
import { PriceOption } from './price-option.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id?: number;
  name: string;
  price: number;
  disclaimer?: string;
  description?: string;
  productComponents: string[];
  photos: number[];
  subcategoryId?: number;
  subcategory?: Subcategory;
  additionalOptions?: AdditionalOption[];
  orderProducts?: OrderProduct[];
  priceOptions?: PriceOption[];
}
