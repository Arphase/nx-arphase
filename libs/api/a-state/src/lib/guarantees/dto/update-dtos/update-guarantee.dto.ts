import { Client, GuaranteeStatus, Vehicle } from '@ivt/c-data';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateVehicleDto, UpdateVehicleDto } from '../../../vehicles';
import { UpdateClientDto } from './update-client.dto';

export class UpdateGuaranteeDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateClientDto)
  client: Client;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateVehicleDto)
  vehicle: Vehicle;

  @IsOptional()
  @Transform(({ obj, key }) => GuaranteeStatus[obj[key]])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsString()
  productType: string;

  @IsOptional()
  @IsNumber()
  kilometrageStart: number;

  @IsOptional()
  @IsNumber()
  kilometrageEnd: number;
}
