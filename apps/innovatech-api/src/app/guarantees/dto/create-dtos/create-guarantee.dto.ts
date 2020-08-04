import { GuaranteeStatus, Client, Vehicle } from '@ivt/data';
import {
  IsDateString,
  IsNotEmpty,
  IsEnum,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVehicleDto } from './create-vehicle.dto';
import { CreateClientDto } from './create-client.dto';

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

  @IsNotEmpty()
  @IsNumberString()
  amount: number;
}
