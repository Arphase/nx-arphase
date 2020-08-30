import { Controller, Post, Body, Res, Param, ParseIntPipe, UseGuards, Get } from '@nestjs/common';
import { PaymentOrdersService } from '../services/payment-orders.service';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment-orders')
@UseGuards(AuthGuard())
export class PaymentOrdersController {

  constructor(private paymentOrdersService: PaymentOrdersService) { }

  @Post('')
  async createPaymentOrder(
    @Body() paymentOrder: CreatePaymentOrderDto,
  ) {
    return this.paymentOrdersService.createPaymentOrder(paymentOrder);
  }

  @Get(':id/pdf')
  async generatePaymentOrderPdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    return this.paymentOrdersService.generatePaymentOrderPdf(id, response);
  }
}
