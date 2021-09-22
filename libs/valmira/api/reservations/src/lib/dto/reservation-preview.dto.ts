import { ReservationAdditionalProduct } from '@valmira/domain';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class ReservationPreviewDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  placeId: number;

  @IsNumber()
  @IsOptional()
  promocodeId: number;

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
