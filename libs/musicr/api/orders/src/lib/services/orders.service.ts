import {
  ApsCollectionFilterDto,
  createCollectionResponse,
  filterCollectionDates,
  filterCollectionQuery,
} from '@arphase/api/core';
import { ApsCollectionResponse, DeepPartial, SortDirection } from '@arphase/common';
import { AdditionalOptionEntity, OrderEntity, PriceOptionEntity, ProductEntity } from '@musicr/api/domain';
import { Order } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { Repository } from 'typeorm';

import { CreateOrderPreviewDto } from '../dto/create-order-preview-dto';
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

  async getOrders(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Order>> {
    const { pageIndex, pageSize, dateType } = filterDto;
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.socialEvent', 'socialEvent')
      .orderBy('order.createdAt', SortDirection.descend);

    filterCollectionQuery('order', query, filterDto, { ignoreDates: dateType === 'startDate' });

    if (dateType === 'startDate') {
      filterCollectionDates('socialEvent', query, filterDto);
    }

    const products = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Order>(products, pageSize, pageIndex, total);
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(await this.createOrderPreview(createOrderDto));
    await this.orderRepository.save(newOrder);
    await newOrder.reload();
    return newOrder;
  }

  async createOrderPreview(createOrderDto: CreateOrderPreviewDto): Promise<DeepPartial<Order>> {
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

    return mapOrderEntityFromDto(createOrderDto, dictionary);
  }
}
