import { IsDate, IsNumber } from 'class-validator';

export class ReservationPreviewDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  placeId: number;
}
