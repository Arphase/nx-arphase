import { VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  @Length(VEHICLE_VIN_LENGTH, VEHICLE_VIN_LENGTH)
  vin: string;

  @IsNotEmpty()
  @IsString()
  motorNumber: string;

  @IsNotEmpty()
  @IsNumber()
  horsePower: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
