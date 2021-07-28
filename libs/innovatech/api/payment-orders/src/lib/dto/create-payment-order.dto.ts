import { Guarantee } from '@innovatech/common/domain';
import { IsArray } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
