import { AdditionalOption } from '../../products';
import { OrderProduct } from './order-product.model';

export interface OrderProductAdditionalOption {
  id: number;
  orderProductId: number;
  orderProduct: OrderProduct;
  additionalOptionId: number;
  additionalOption: AdditionalOption;
  price: number;
}
