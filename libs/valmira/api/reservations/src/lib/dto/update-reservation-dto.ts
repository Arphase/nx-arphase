import { PartialType } from '@nestjs/mapped-types';
import { Customer, ReservationStatus } from '@valmira/domain';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateCustomerDto, CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @Transform(({ obj, key }) => ReservationStatus[obj[key]])
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCustomerDto)
  customer: Customer;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNumber()
  id: number;
}
