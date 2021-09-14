import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Order } from '@musicr/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';

import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Order>> {
    return this.ordersService.getOrders(filterDto);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
