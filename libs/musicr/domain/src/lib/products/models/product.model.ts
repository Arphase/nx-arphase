import { OrderProduct } from '../../orders';
import { AdditionalOption } from './additional-option.model';
import { PriceOption } from './price-option.model';
import { ProductComponent } from './product-component.model';
import { ProductPhoto } from './product-photo.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  disclaimer: string;
  description: string;
  subcategoryId: number;
  subcategory: Subcategory;
  additionalOptions: AdditionalOption[];
  orderProducts: OrderProduct[];
  priceOptions: PriceOption[];
  productComponents: ProductComponent[];
  productPhotos: ProductPhoto[];
}
