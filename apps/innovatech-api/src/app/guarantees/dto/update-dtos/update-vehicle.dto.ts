import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  productType: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  version: string;

  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsString()
  invoiceDate: string;

  @IsOptional()
  @IsString()
  vin: string;

  @IsOptional()
  @IsString()
  motorNumber: string;

  @IsOptional()
  @IsString()
  serialNumber: string;

  @IsOptional()
  @IsNumberString()
  horsePower: number;

  @IsOptional()
  @IsNumberString()
  kilometrageStart: number;

  @IsOptional()
  @IsNumberString()
  kilometrageEnd: number;
}
