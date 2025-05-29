import { createCollectionResponse, filterCollectionDates, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, DeepPartial, SortDirection } from '@arphase/common';
import {
  AdditionalOptionEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PriceOptionEntity,
  ProductEntity,
} from '@musicr/api/domain';
import { Order } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { keyBy } from 'lodash';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { In, Repository } from 'typeorm';

import { CreateOrderPreviewDto } from '../dto/create-order-preview-dto';
import { CreateOrderQuoteDto } from '../dto/create-order-quote.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ExportPdfDto } from '../dto/export-pdf.dto';
import { FilterOrdersDto } from '../dto/filter-orders.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { createOrderEmail } from '../functions/create-order-email';
import { generateOrderPdf } from '../functions/generate-order-pdf';
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
    @InjectRepository(AdditionalOptionEntity) private additionalOptionRepository: Repository<AdditionalOptionEntity>,
    @InjectRepository(OrderProductEntity)
    private orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(OrderProductAdditionalOptionEntity)
    private orderProductAdditionalOptionRepository: Repository<OrderProductAdditionalOptionEntity>,
  ) {}

  async getOrders(filterDto: FilterOrdersDto): Promise<ApsCollectionResponse<Order>> {
    const { pageIndex, pageSize, dateType, text, orderType, status } = filterDto;
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
        { text: `%${text.toLowerCase()}%` },
      );
    }

    if (orderType) {
      query.andWhere('(order.orderType = :orderType)', { orderType });
    }

    if (status) {
      query.andWhere('(order.status = :status)', { status });
    }

    const products = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Order>(products, pageSize, pageIndex, total);
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id }, withDeleted: true });
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

  /**
   * Updates order
   * We need to make sure all not send orderProducts and orderProductAdditionalOptions are deleted
   * to avoid not null constrain in database
   */
  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order> {
    let order: DeepPartial<Order>;
    if (updateOrderDto.status) {
      order = updateOrderDto;
    } else {
      order = await this.createOrderPreview(updateOrderDto);
      const existingOrderProducts = await this.orderProductRepository.findBy({ orderId: order.id });
      await Promise.all(
        order.orderProducts.map(async orderProduct => {
          const existingAdditionalOptions = await this.orderProductAdditionalOptionRepository.findBy({
            orderProductId: orderProduct.id,
          });
          await Promise.all(
            existingAdditionalOptions.map(async existingAdditionalOption => {
              if (!orderProduct.orderProductAdditionalOptions.find(({ id }) => existingAdditionalOption.id === id)) {
                await this.orderProductAdditionalOptionRepository.delete({ id: existingAdditionalOption.id });
              }
            }),
          );
        }),
      );
      await Promise.all(
        existingOrderProducts.map(async existingOrderProduct => {
          if (!order.orderProducts.find(({ id }) => existingOrderProduct.id === id)) {
            await this.orderProductRepository.delete({ id: existingOrderProduct.id });
          }
        }),
      );
    }

    const updatedOrder = this.orderRepository.create(order);
    await this.orderRepository.save(updatedOrder);
    await updatedOrder.reload();
    return updatedOrder;
  }

  async createOrderPreview(
    createOrderDto: CreateOrderPreviewDto | CreateOrderQuoteDto | UpdateOrderDto,
  ): Promise<DeepPartial<Order>> {
    const { productIds, priceOptionIds, additionalOptionIds } = getAllItemIdsWithPrices(createOrderDto);
    const products = await this.productRepository.findBy({ id: In(productIds) });
    const priceOptions = await this.priceOptionRepository.findBy({ id: In(priceOptionIds) });
    const additionalOptions = await this.additionalOptionRepository.findBy({ id: In(additionalOptionIds) });

    const dictionary: ItemsWithPriceDictionary = {
      products: keyBy(products, 'id'),
      priceOptions: keyBy(priceOptions, 'id'),
      additionalOptions: keyBy(additionalOptions, 'id'),
    };

    return mapOrderEntityFromDto(createOrderDto, dictionary);
  }

  async generatePdf(id: number, queryDto: ExportPdfDto, response: Response): Promise<void> {
    const order = await this.getOrder(id);
    await generateOrderPdf(order, queryDto, response);
  }
}
