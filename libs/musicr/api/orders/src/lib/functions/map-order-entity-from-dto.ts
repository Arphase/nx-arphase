import { DeepPartial } from '@arphase/common';
import {
  AdditionalOption,
  getAdditionalOptionCurrentPrice,
  getPriceOptionCurrentPrice,
  getProductCurrentPrice,
  Order,
  OrderProduct,
  PriceOption,
  Product,
} from '@musicr/domain';
import { uniq } from 'lodash';

import { CreateOrderPreviewDto } from '../dto/create-order-preview-dto';
import { CreateOrderQuoteDto } from '../dto/create-order-quote.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

export function mapOrderEntityFromDto(
  orderDto: CreateOrderDto | CreateOrderPreviewDto | CreateOrderQuoteDto | UpdateOrderDto,
  dictionary: ItemsWithPriceDictionary,
): DeepPartial<Order> {
  const { id, customer, socialEvent, orderType, orderProducts } = orderDto;
  const orderProductsWithPrice = mapOrderProducts(orderDto, orderProducts, dictionary);
  return {
    id,
    customer,
    socialEvent,
    orderType,
    orderProducts: orderProductsWithPrice,
    total: getTotal(orderProductsWithPrice),
  };
}

export function mapOrderProducts(
  order: CreateOrderDto | CreateOrderPreviewDto | CreateOrderQuoteDto | UpdateOrderDto,
  createOrderProductsDto: OrderProduct[],
  dictionary: ItemsWithPriceDictionary,
): DeepPartial<OrderProduct>[] {
  return createOrderProductsDto.map(({ id, amount, productId, priceOptionId, orderProductAdditionalOptions }) => ({
    id: id,
    orderId: order.id,
    amount: amount,
    productId: productId,
    priceOptionId: priceOptionId,
    price: priceOptionId
      ? getPriceOptionCurrentPrice(dictionary.products[productId], dictionary.priceOptions[priceOptionId])
      : getProductCurrentPrice(dictionary.products[productId]),
    orderProductAdditionalOptions: (orderProductAdditionalOptions || []).map(additionalOption => ({
      id: additionalOption.id,
      orderProductId: id,
      additionalOptionId: additionalOption.additionalOptionId,
      price: getAdditionalOptionCurrentPrice(
        dictionary.products[productId],
        dictionary.additionalOptions[additionalOption.additionalOptionId],
      ),
    })),
  }));
}

export function getTotal(orderProducts: DeepPartial<OrderProduct>[]): number {
  let total = 0;
  orderProducts.forEach(({ price, amount, orderProductAdditionalOptions }) => {
    total += amount * price;
    (orderProductAdditionalOptions || []).forEach(({ price }) => (total += price));
  });
  return total;
}

export type ItemIdsWithPrice = { productIds: number[]; priceOptionIds: number[]; additionalOptionIds: number[] };

export type ItemsWithPriceDictionary = {
  products: Record<number, Product>;
  priceOptions: Record<number, PriceOption>;
  additionalOptions: Record<number, AdditionalOption>;
};

export function getAllItemIdsWithPrices(
  createOrderDto: CreateOrderDto | CreateOrderPreviewDto | CreateOrderQuoteDto,
): ItemIdsWithPrice {
  const { orderProducts } = createOrderDto;
  const productIds = [];
  const priceOptionIds = [];
  const additionalOptionIds = [];

  orderProducts.forEach(orderProduct => {
    productIds.push(orderProduct.productId);
    priceOptionIds.push(orderProduct.priceOptionId);
    (orderProduct.orderProductAdditionalOptions || []).forEach(orderProductAdditionalOption =>
      additionalOptionIds.push(orderProductAdditionalOption.additionalOptionId),
    );
  });

  return {
    productIds: uniq(productIds),
    priceOptionIds: uniq(priceOptionIds),
    additionalOptionIds: uniq(additionalOptionIds),
  };
}
