import { AdditionalOption } from './additional-option.model';
import { OrderProduct } from './order-product.model';
import { Photo } from './photo.model';
import { PriceOption } from './price-option.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  price: number;
  disclaimer?: string;
  description?: string;
  productComponents?: string[];
  position?: number;
  popularity?: number;
  hasActivePromotion?: boolean;
  promotionDiscount?: number;
  subcategoryId?: number;
  subcategory?: Subcategory;
  photos?: Photo[];
  additionalOptions?: AdditionalOption[];
  orderProducts?: OrderProduct[];
  priceOptions?: PriceOption[];
}

export function getProductCurrentPrice(product: Product) {
  if (!product) {
    return 0;
  }
  const { hasActivePromotion, promotionDiscount, price } = product;
  if (hasActivePromotion && promotionDiscount) {
    return Math.ceil(price * ((100 - promotionDiscount) / 100));
  } else {
    return price;
  }
}
