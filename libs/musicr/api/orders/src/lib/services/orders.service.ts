import { AdditionalOptionEntity, OrderEntity, PriceOptionEntity, ProductEntity } from '@musicr/api/domain';
import { Order } from '@musicr/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { Repository } from 'typeorm';

import { CreateOrderDto } from '../dto/create-order.dto';
import {
  getAllItemIdsWithPrices,
  ItemsWithPriceDictionary,
  mapOrderEntityFromDto,
} from '../functions/map-order-entity-from-dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceOptionEntity) private priceOptionRepository: Repository<PriceOptionEntity>,
    @InjectRepository(AdditionalOptionEntity) private additionalOptionRepository: Repository<AdditionalOptionEntity>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { productIds, priceOptionIds, additionalOptionIds } = getAllItemIdsWithPrices(createOrderDto);
    const products = await this.productRepository.findByIds(productIds);
    const priceOptions = await this.priceOptionRepository.findByIds(priceOptionIds);
    const additionalOptions = await this.additionalOptionRepository.findByIds(additionalOptionIds);

    const dictionary: ItemsWithPriceDictionary = {
      products: keyBy(
        products.map(({ id, price }) => ({ id, price })),
        'id'
      ),
      priceOptions: keyBy(
        priceOptions.map(({ id, price }) => ({ id, price })),
        'id'
      ),
      additionalOptions: keyBy(
        additionalOptions.map(({ id, price }) => ({ id, price })),
        'id'
      ),
    };

    const newOrder = this.orderRepository.create(mapOrderEntityFromDto(createOrderDto, dictionary));
    await this.orderRepository.save(newOrder);
    await newOrder.reload();
    return newOrder;
  }
}
