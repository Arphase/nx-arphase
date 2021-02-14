import { Guarantee } from '@ivt/c-data';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
