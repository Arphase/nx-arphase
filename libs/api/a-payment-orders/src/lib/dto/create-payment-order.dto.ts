import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentOrderDto {
  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsArray()
  guarantees: [{ id: number; amount: number; invoiceDate: Date }];
}