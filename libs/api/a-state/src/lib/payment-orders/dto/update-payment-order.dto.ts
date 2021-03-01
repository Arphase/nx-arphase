import { Guarantee } from '@ivt/c-data';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePaymentOrderDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
