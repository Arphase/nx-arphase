import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsNumberString()
  zipCode: number;

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
  streetNumber: string;
}
