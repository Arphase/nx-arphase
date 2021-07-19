import { OrderRepository } from '@musicr/api/domain';
import { Order } from '@musicr/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderRepository) private orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create({ ...createOrderDto, total: this.getTotal(createOrderDto) });
    await newOrder.save();
    return newOrder;
  }

  getTotal(createOrderDto: CreateOrderDto): number {
    const total = 0;

    return total;
  }
}
