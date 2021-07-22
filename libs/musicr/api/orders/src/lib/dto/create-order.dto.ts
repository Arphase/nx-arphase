import { Trim } from '@arphase/api';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCustomerDto {
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
  @Trim()
  zipcode: string;

  @IsString()
  @Trim()
  country: string;

  @IsString()
  @Trim()
  state: string;

  @IsString()
  @Trim()
  city: string;

  @IsString()
  @Trim()
  suburb: string;

  @IsString()
  @Trim()
  street: string;

  @IsString()
  @Trim()
  externalNumber: string;

  @IsOptional()
  @IsString()
  @Trim()
  internalNumber: string;
}

export class CreateSocialEventDto {
  @IsString()
  name: string;

  @IsString()
  eventType: string;

  startDate: Date;

  endDate: Date;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  eventPlace: string;

  @IsString()
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
}
