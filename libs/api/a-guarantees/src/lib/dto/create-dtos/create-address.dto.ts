import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsNumberString()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  suburb: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  externalNumber: string;

  @IsOptional()
  @IsString()
  internalNumber: string;
}
