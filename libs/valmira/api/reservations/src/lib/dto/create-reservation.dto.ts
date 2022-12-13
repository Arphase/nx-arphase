import { Customer, ReservationAdditionalProduct } from '@valmira/domain';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import dayjs from 'dayjs';

export class CreateReservationDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsDate()
  @Transform(({ obj }) => dayjs(obj['startDate']).set('hour', 15).set('minute', 0).set('second', 0).toDate())
  startDate: Date;

  @IsDate()
  @Transform(({ obj }) => dayjs(obj['endDate']).set('hour', 11).set('minute', 0).set('second', 0).toDate())
  endDate: Date;

  @IsNumber()
  placeId: number;

  @IsNumber()
  @IsOptional()
  promocodeId: number;

  @IsString()
  @IsOptional()
  additionalComments: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: Customer;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateReservationAdditionalProductDto)
  additionalProducts: ReservationAdditionalProduct[];
}

export class CreateCustomerDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

export class CreateReservationAdditionalProductDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  additionalProductId: number;
}
