import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsNumber()
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
