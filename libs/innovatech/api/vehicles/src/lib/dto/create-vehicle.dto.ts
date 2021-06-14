import { Trim } from '@arphase/api';
import { VEHICLE_VIN_LENGTH } from '@innovatech/common/domain';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Trim()
  brand: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  model: string;

  @IsOptional()
  @IsString()
  @Trim()
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
  @Trim()
  motorNumber: string;

  @IsOptional()
  @IsNumber()
  horsePower: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
