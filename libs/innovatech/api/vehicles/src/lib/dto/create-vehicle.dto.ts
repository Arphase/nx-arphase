import { Trim } from '@arphase/api/core';
import { VEHICLE_VIN_LENGTH } from '@innovatech/common/domain';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Trim('brand')
  brand: string;

  @IsString()
  @Trim('model')
  model: string;

  @IsOptional()
  @IsString()
  @Trim('version')
  version: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsString()
  @Length(VEHICLE_VIN_LENGTH, VEHICLE_VIN_LENGTH)
  vin: string;

  @IsOptional()
  @IsString()
  @Trim('motorNumber')
  motorNumber: string;

  @IsOptional()
  @IsNumber()
  horsePower: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
