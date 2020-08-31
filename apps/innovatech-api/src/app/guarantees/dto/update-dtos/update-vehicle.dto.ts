import { Type } from 'class-transformer';
import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
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

  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsString()
  vin: string;

  @IsOptional()
  @IsString()
  motorNumber: string;

  @IsOptional()
  @IsString()
  serialNumber: string;

  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  horsePower: number;

  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  kilometrageStart: number;

  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  kilometrageEnd: number;
}
