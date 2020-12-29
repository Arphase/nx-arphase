import { Client, Vehicle } from '@ivt/c-data';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateClientDto } from './create-client.dto';
import { CreateVehicleDto } from './create-vehicle.dto';

export class CreateGuaranteeDto {
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: Client;

  @ValidateNested()
  @Type(() => CreateVehicleDto)
  vehicle: Vehicle;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  productId: number;
}
