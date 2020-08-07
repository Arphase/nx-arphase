import { IsNotEmpty, IsNumberString, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsNumberString()
  zipCode: number;

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
