import { CreateAddressDto } from '@arphase/api/core';
import { Address } from '@arphase/common';
import {
  Customer,
  OrderProduct,
  OrderProductAdditionalOption,
  OrderTypes,
  SocialEvent,
  SocialEventPlaces,
} from '@musicr/domain';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCustomerDto {
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

export class CreateSocialEventDto {
  @IsString()
  eventType: string;

  @IsDate()
  date: Date;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsEnum(SocialEventPlaces)
  eventPlace: SocialEventPlaces;

  @IsString()
  @IsOptional()
  notes: string;

  @IsBoolean()
  requiresAssembly: boolean;
}

export class CreateOrderProductDto {
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
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}

export class CreateOrderProductAdditionalOptionDto {
  @IsNumber()
  additionalOptionId: number;
}

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: Customer;

  @ValidateNested()
  @Type(() => CreateSocialEventDto)
  socialEvent: SocialEvent;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductDto)
  orderProducts: OrderProduct[];

  @IsEnum(OrderTypes)
  orderType: OrderTypes;
}
