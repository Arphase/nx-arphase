import { Trim } from '@arphase/api/core';
import { OrderTypes, SocialEventPlaces } from '@musicr/domain';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
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

export class CreateAddressDto {
  @IsNumberString()
  @Trim('zipcode')
  zipcode: string;

  @IsString()
  @Trim('country')
  country: string;

  @IsString()
  @Trim('state')
  state: string;

  @IsString()
  @Trim('city')
  city: string;

  @IsString()
  @Trim('suburb')
  suburb: string;

  @IsString()
  @Trim('street')
  street: string;

  @IsString()
  @Trim('externalNumber')
  externalNumber: string;

  @IsOptional()
  @IsString()
  @Trim('internalNumber')
  internalNumber: string;
}

export class CreateSocialEventDto {
  @IsString()
  name: string;

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
  address: CreateAddressDto;

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
  orderProductAdditionalOptions: CreateOrderProductAdditionalOptionDto[];
}

export class CreateOrderProductAdditionalOptionDto {
  @IsNumber()
  additionalOptionId: number;
}

export class CreateOrderDto {
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
