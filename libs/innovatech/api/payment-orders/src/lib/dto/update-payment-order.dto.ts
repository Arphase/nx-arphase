import { Guarantee } from '@innovatech/common/domain';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePaymentOrderDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
