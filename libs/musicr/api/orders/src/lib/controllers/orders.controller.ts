import { Order } from '@musicr/domain';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createProduct(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
