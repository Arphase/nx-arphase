import { Roles, RolesGuard } from '@ivt/a-auth';
import { CreatePaymentOrderDto, UpdatePaymentOrderDto } from '@ivt/a-state';
import { PaymentOrder, UserRoles } from '@ivt/c-data';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { PaymentOrdersService } from '../services/payment-orders.service';

@Controller('payment-orders')
@UseGuards(AuthGuard(), RolesGuard)
export class PaymentOrdersController {
  constructor(private paymentOrdersService: PaymentOrdersService) {}

  @Get(':id')
  async getPaymentOrder(@Param('id', ParseIntPipe) id: number): Promise<PaymentOrder> {
    return this.paymentOrdersService.getPaymentOrder(id);
  }

  @Post('')
  @Roles(UserRoles.superAdmin)
  async createPaymentOrder(@Body() paymentOrder: CreatePaymentOrderDto): Promise<PaymentOrder> {
    return this.paymentOrdersService.createPaymentOrder(paymentOrder);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  async updatePaymentOrder(@Body() paymentOrder: UpdatePaymentOrderDto): Promise<PaymentOrder> {
    return this.paymentOrdersService.updatePaymentOrder(paymentOrder);
  }

  @Get(':id/pdf')
  async generatePaymentOrderPdf(@Param('id', ParseIntPipe) id: number, @Res() response: Response): Promise<void> {
    return this.paymentOrdersService.generatePaymentOrderPdf(id, response);
  }
}
