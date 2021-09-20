import { DeepPartial } from '@arphase/common';
import { Order, OrderProduct } from '@musicr/domain';
import { uniq } from 'lodash';

import { CreateOrderDto, CreateOrderProductDto } from '../dto/create-order.dto';

export function mapOrderEntityFromDto(
  createOrderDto: CreateOrderDto,
  dictonary: ItemsWithPriceDictionary
): DeepPartial<Order> {
  const { customer, socialEvent, orderProducts } = createOrderDto;
  const orderProductsWithPrice = mapOrderProducts(orderProducts, dictonary);
  return {
    customer,
    socialEvent,
    orderProducts: orderProductsWithPrice,
    total: getTotal(orderProductsWithPrice),
  };
}

export function mapOrderProducts(
  createorderProductsDto: CreateOrderProductDto[],
  dictionary: ItemsWithPriceDictionary
): DeepPartial<OrderProduct>[] {
  return createorderProductsDto.map(orderProduct => ({
    amount: orderProduct.amount,
    productId: orderProduct.productId,
    priceOptionId: orderProduct.priceOptionId,
    price: orderProduct.priceOptionId
      ? dictionary.priceOptions[orderProduct.priceOptionId].price
      : dictionary.products[orderProduct.productId].price,
    orderProductAdditionalOptions: (orderProduct.orderProductAdditionalOptions || []).map(additionalOption => ({
      additionalOptionId: additionalOption.additionalOptionId,
      price: dictionary.additionalOptions[additionalOption.additionalOptionId].price,
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
  products: Record<number, { id: number; price: number }>;
  priceOptions: Record<number, { id: number; price: number }>;
  additionalOptions: Record<number, { id: number; price: number }>;
};

export function getAllItemIdsWithPrices(createOrderDto: CreateOrderDto): ItemIdsWithPrice {
  const { orderProducts } = createOrderDto;
  const productIds = [];
  const priceOptionIds = [];
  const additionalOptionIds = [];

  orderProducts.forEach(orderProduct => {
    productIds.push(orderProduct.productId);
    priceOptionIds.push(orderProduct.priceOptionId);
    orderProduct.orderProductAdditionalOptions.forEach(orderProductAdditionalOption =>
      additionalOptionIds.push(orderProductAdditionalOption.additionalOptionId)
    );
  });

  return {
    productIds: uniq(productIds),
    priceOptionIds: uniq(priceOptionIds),
    additionalOptionIds: uniq(additionalOptionIds),
  };
}
