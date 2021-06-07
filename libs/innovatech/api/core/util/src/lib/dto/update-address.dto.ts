import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsNumberString()
  zipcode: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  suburb: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  externalNumber: string;

  @IsOptional()
  @IsString()
  internalNumber: string;
}
