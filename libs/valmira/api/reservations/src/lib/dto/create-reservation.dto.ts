import { Customer } from '@valmira/domain';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: Customer;
}

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
