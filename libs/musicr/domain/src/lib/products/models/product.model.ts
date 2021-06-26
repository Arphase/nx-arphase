import { OrderProduct } from '../../orders';
import { AdditionalOption } from './additional-option.model';
import { PriceOption } from './price-option.model';
import { ProductPhoto } from './product-photo.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id?: number;
  name: string;
  price: number;
  disclaimer?: string;
  description?: string;
  productComponents: string[];
  subcategoryId?: number;
  subcategory?: Subcategory;
  additionalOptions?: AdditionalOption[];
  orderProducts?: OrderProduct[];
  priceOptions?: PriceOption[];
  productPhotos?: ProductPhoto[];
}
