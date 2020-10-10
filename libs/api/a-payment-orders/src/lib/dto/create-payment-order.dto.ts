import { Guarantee } from '@ivt/c-data';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
