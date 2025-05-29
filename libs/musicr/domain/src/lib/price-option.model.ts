import { OrderProduct } from './order-product.model';
import { Photo } from './photo.model';
import { Product } from './product.model';

export interface PriceOption {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  price: number;
  includedInPromotion?: boolean;
  productId: number;
  product: Product;
  photos: Photo[];
  orderProducts: OrderProduct[];
}

export function getPriceOptionCurrentPrice(product: Product, priceOption: PriceOption) {
  if (!product || !priceOption) {
    return 0;
  }
  const { hasActivePromotion, promotionDiscount } = product;
  const { includedInPromotion, price } = priceOption;
  if (hasActivePromotion && promotionDiscount && includedInPromotion) {
    return Math.ceil(price * ((100 - promotionDiscount) / 100));
  } else {
    return price;
  }
}
