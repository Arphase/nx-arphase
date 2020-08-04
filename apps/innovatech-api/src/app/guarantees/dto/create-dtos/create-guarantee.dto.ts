import { GuaranteeStatus, Client, Vehicle } from '@ivt/data';
import {
  IsDate,
  IsNotEmpty,
  IsEnum,
  IsNumber,
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
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;

  @IsNotEmpty()
  paymentOrder: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
