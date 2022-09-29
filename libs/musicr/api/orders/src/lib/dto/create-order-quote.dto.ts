import { Trim } from '@arphase/api/core';
import { OrderTypes } from '@musicr/domain';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateCustomerDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

class CreateAddressDto {
  @IsNumberString()
  @Trim('zipcode')
  zipcode: string;
}

class CreateSocialEventDto {
  @IsDate()
  date: Date;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}

class CreateOrderProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  priceOptionId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductAdditionalOptionDto)
  orderProductAdditionalOptions: CreateOrderProductAdditionalOptionDto[];
}

class CreateOrderProductAdditionalOptionDto {
  @IsNumber()
  additionalOptionId: number;
}

export class CreateOrderQuoteDto {
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ValidateNested()
  @Type(() => CreateSocialEventDto)
  socialEvent: CreateSocialEventDto;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[];

  @IsEnum(OrderTypes)
  orderType: OrderTypes;
}
