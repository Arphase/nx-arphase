import { Client, GuaranteeStatus, Vehicle } from '@ivt/c-data';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  ValidateNested,
  isNumber,
  IsNotEmpty,
} from 'class-validator';
import { IsInt } from 'class-validator';

import { UpdateClientDto } from './update-client.dto';
import { UpdateVehicleDto } from './update-vehicle.dto';

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
  @Type(() => UpdateVehicleDto)
  vehicle: Vehicle;

  @IsOptional()
  @Transform((value) => GuaranteeStatus[value])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  amount: number;
}
