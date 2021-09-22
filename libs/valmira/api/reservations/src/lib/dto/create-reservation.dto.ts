import { Customer, ReservationAdditionalProduct } from '@valmira/domain';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  placeId: number;

  @IsNumber()
  @IsOptional()
  promocodeId: number;

  @IsString()
  @IsOptional()
  additionalComments: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: Customer;

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
