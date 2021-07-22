import { Trim } from '@arphase/api';
import { VEHICLE_VIN_LENGTH } from '@innovatech/common/domain';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Trim()
  brand: string;

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
