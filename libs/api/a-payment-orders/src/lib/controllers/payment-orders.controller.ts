import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';
import { PaymentOrdersService } from '../services/payment-orders.service';

@Controller('paymentOrders')
@UseGuards(AuthGuard())
export class PaymentOrdersController {
  constructor(private paymentOrdersService: PaymentOrdersService) {}

  @Post('')
  async createPaymentOrder(@Body() paymentOrder: CreatePaymentOrderDto) {
    return this.paymentOrdersService.createPaymentOrder(paymentOrder);
  }

  @Get(':id/pdf')
  async generatePaymentOrderPdf(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    return this.paymentOrdersService.generatePaymentOrderPdf(id, response);
  }
}
