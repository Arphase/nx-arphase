import { Guarantee } from '@ivt/c-data';
import { IsArray, IsNotEmpty, IsInt, IsString } from 'class-validator';

export class UpdatePaymentOrderDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
