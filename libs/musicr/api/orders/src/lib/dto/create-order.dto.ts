import { Trim } from '@arphase/api';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateAddressDto {
  @IsNotEmpty()
  @IsNumberString()
  @Trim()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  country: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  state: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  suburb: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  street: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  externalNumber: string;

  @IsOptional()
  @IsString()
  @Trim()
  internalNumber: string;
}

export class CreateSocialEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  eventType: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  eventPlace: string;

  @IsNotEmpty()
  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsBoolean()
  requiresAssembly: boolean;
}

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsNumber()
  additionalOptionId: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateSocialEventDto)
  socialEvent: CreateSocialEventDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[];
}
