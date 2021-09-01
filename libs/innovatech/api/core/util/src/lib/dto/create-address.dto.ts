import { Trim } from '@arphase/api/core';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

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
