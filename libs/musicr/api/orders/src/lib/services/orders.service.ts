import { createCollectionResponse, filterCollectionDates, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, DeepPartial, SortDirection } from '@arphase/common';
import { AdditionalOptionEntity, OrderEntity, PriceOptionEntity, ProductEntity } from '@musicr/api/domain';
import { Order } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Repository } from 'typeorm';

import { CreateOrderPreviewDto } from '../dto/create-order-preview-dto';
import { CreateOrderQuoteDto } from '../dto/create-order-quote.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { FilterOrdersDto } from '../dto/filter-orders.dto';
import { createOrderEmail } from '../functions/create-order-email';
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

  async getOrders(filterDto: FilterOrdersDto): Promise<ApsCollectionResponse<Order>> {
    const { pageIndex, pageSize, dateType, text, orderType } = filterDto;
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.socialEvent', 'socialEvent')
      .orderBy('order.createdAt', SortDirection.descend);

    filterCollectionQuery('order', query, filterDto, { ignoreDates: dateType === 'startDate' });

    if (dateType === 'startDate') {
      filterCollectionDates('socialEvent', query, filterDto);
    }

    if (text) {
      query.andWhere(
        `(CAST (order.id AS varchar) like :text OR
          LOWER(customer.firstName) like :text OR
          LOWER(customer.lastName) like :text OR
          LOWER(socialEvent.name) like :text OR
          LOWER(CONCAT(customer.firstName, ' ', customer.lastName)) like :text)`,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    if (orderType) {
      query.andWhere('(order.orderType = :orderType)', { orderType });
    }

    const products = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Order>(products, pageSize, pageIndex, total);
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ id }, { withDeleted: true });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto | CreateOrderQuoteDto): Promise<Order> {
    const newOrder = this.orderRepository.create(await this.createOrderPreview(createOrderDto));
    await this.orderRepository.save(newOrder);
    await newOrder.reload();

    const transporter = createTransport({
      host: process.env.SMTP,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions: Mail.Options = {
      from: `Music Revolution <${process.env.MAIL_ACCOUNT_SENDER}>`,
      to: process.env.MAIL_ACCOUNT_RECEIVER,
      subject: `Nueva orden folio:${newOrder.id}`,
      html: createOrderEmail(newOrder),
    };
    await transporter.sendMail(mailOptions);

    return newOrder;
  }

  async createOrderPreview(createOrderDto: CreateOrderPreviewDto | CreateOrderQuoteDto): Promise<DeepPartial<Order>> {
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
