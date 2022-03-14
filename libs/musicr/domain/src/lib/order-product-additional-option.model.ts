import { AdditionalOption } from './additional-option.model';
import { OrderProduct } from './order-product.model';

export interface OrderProductAdditionalOption {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  orderProductId: number;
  orderProduct: OrderProduct;
  additionalOptionId: number;
  additionalOption: AdditionalOption;
  price: number;
}
