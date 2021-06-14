import { Trim } from '@arphase/api';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsNumberString()
  @Trim()
  zipcode: string;

  @IsOptional()
  @IsString()
  @Trim()
  country: string;

  @IsOptional()
  @IsString()
  @Trim()
  state: string;

  @IsOptional()
  @IsString()
  @Trim()
  city: string;

  @IsOptional()
  @IsString()
  @Trim()
  suburb: string;

  @IsOptional()
  @IsString()
  @Trim()
  street: string;

  @IsOptional()
  @IsString()
  @Trim()
  externalNumber: string;

  @IsOptional()
  @IsString()
  @Trim()
  internalNumber: string;
}
