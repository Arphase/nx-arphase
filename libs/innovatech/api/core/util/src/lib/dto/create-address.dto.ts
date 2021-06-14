import { Trim } from '@arphase/api';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

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
