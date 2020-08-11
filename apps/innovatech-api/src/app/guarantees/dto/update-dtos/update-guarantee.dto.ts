import { Client, GuaranteeStatus, Vehicle } from '@ivt/data';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { UpdateClientDto } from './update-client.dto';
import { UpdateVehicleDto } from './update-vehicle.dto';

export class UpdateGuaranteeDto {
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

  @IsOptional()
  @IsNumberString()
  amount: number;
}
