import { Guarantee } from '@innovatech/common/domain';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
