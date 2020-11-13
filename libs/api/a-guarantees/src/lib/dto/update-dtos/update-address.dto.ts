import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsNumberString()
  zipCode: string;

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
