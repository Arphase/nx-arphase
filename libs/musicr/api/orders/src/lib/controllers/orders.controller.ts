import { ApsCollectionResponse, DeepPartial } from '@arphase/common';
import { Order } from '@musicr/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { CreateOrderPreviewDto } from '../dto/create-order-preview-dto';
import { CreateOrderQuoteDto } from '../dto/create-order-quote.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ExportPdfDto } from '../dto/export-pdf.dto';
import { FilterOrdersDto } from '../dto/filter-orders.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrders(@Query() filterDto: FilterOrdersDto): Promise<ApsCollectionResponse<Order>> {
    return this.ordersService.getOrders(filterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(updateOrderDto);
  }

  @Post('quote')
  async createOrderQuote(@Body() createOrderDto: CreateOrderQuoteDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post('preview')
  async createOrderPreview(@Body() createOrderDto: CreateOrderPreviewDto): Promise<DeepPartial<Order>> {
    return this.ordersService.createOrderPreview(createOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('export/pdf/:id')
  async getOrderPdf(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryDto: ExportPdfDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.ordersService.generatePdf(id, queryDto, response);
  }
}
