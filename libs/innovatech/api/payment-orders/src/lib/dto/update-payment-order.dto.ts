import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class UpdatePaymentOrderDto extends PartialType(CreatePaymentOrderDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
