import { VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  version: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  @Length(VEHICLE_VIN_LENGTH, VEHICLE_VIN_LENGTH)
  vin: string;

  @IsOptional()
  @IsString()
  motorNumber: string;

  @IsNotEmpty()
  @IsNumber()
  horsePower: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
