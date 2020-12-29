import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

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
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  vin: string;

  @IsOptional()
  @IsString()
  motorNumber: string;

  @IsOptional()
  @IsNumber()
  horsePower: number;

  @IsOptional()
  @IsNumber()
  kilometrageStart: number;

  @IsOptional()
  @IsNumber()
  kilometrageEnd: number;
}
