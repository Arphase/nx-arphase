import { PartialType } from '@nestjs/mapped-types';
import { Customer, ReservationAdditionalProduct, ReservationStatus } from '@valmira/domain';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateCustomerDto, CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @Transform((_, obj) => ReservationStatus[obj['status']])
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCustomerDto)
  customer: Customer;

  @IsOptional()
  @IsString()
  paymentId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateReservationAdditionalProductDto)
  additionalProducts: ReservationAdditionalProduct[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional()
  @IsNumber()
  id: number;
}

export class UpdateReservationAdditionalProductDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  additionalProductId: number;

  @IsOptional()
  @IsBoolean()
  destroy: boolean;
}
