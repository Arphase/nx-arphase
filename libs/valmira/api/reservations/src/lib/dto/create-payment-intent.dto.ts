import { IsNumber } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  reservationId: number;
}
