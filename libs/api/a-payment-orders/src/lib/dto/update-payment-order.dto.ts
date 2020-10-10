import { Guarantee } from '@ivt/c-data';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentOrderDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
