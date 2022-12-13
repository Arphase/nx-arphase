import { ReservationAdditionalProduct } from '@valmira/domain';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import dayjs from 'dayjs';

export class ReservationPreviewDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => dayjs(obj['startDate']).set('hour', 15).set('minute', 0).set('second', 0).toDate())
  @IsDate()
  startDate: Date;

  @Transform(({ obj }) => dayjs(obj['endDate']).set('hour', 11).set('minute', 0).set('second', 0).toDate())
  @IsDate()
  endDate: Date;

  @IsNumber()
  placeId: number;

  @IsOptional()
  @IsNumber()
  promocodeId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => ReservationAdditionalProductPreviewDto)
  additionalProducts: ReservationAdditionalProduct[];
}

export class ReservationAdditionalProductPreviewDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  additionalProductId: number;
}
