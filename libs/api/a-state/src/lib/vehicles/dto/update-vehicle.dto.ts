import { VEHICLE_VIN_LENGTH, VehicleStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

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
  @Length(VEHICLE_VIN_LENGTH, VEHICLE_VIN_LENGTH)
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

  @IsOptional()
  @Transform(({ obj, key }) => VehicleStatus[obj[key]])
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
