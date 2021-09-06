import { Guarantee } from '@innovatech/common/domain';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsNumberString, IsString, ValidateNested } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePaymentOrderGuaranteeDto)
  guarantees: Partial<Guarantee>[];
}

export class CreatePaymentOrderGuaranteeDto {
  @IsNumber()
  id: number;

  @IsNumberString()
  amount: string;

  @IsDate()
  invoiceDate: Date;

  @IsString()
  invoiceNumber: string;
}
