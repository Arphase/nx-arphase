import { OrderProductAdditionalOption } from './order-product-additional-option.model';
import { Product } from './product.model';

export interface AdditionalOption {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  price: number;
  includedInPromotion?: boolean;
  productId: number;
  product: Product;
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}

export function getAdditionalOptionCurrentPrice(product: Product, additionalOption: AdditionalOption) {
  if (!product || !additionalOption) {
    return 0;
  }
  const { hasActivePromotion, promotionDiscount } = product;
  const { includedInPromotion, price } = additionalOption;
  if (hasActivePromotion && promotionDiscount && includedInPromotion) {
    return Math.ceil(price * ((100 - promotionDiscount) / 100));
  } else {
    return price;
  }
}
