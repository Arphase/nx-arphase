import { IsEnum, IsOptional, ValidateNested, IsDateString, IsNumberString } from 'class-validator';
import { GuaranteeStatus, Client, Vehicle } from '@ivt/data';
import { Type } from 'class-transformer'
import { UpdateVehicleDto } from './update-vehicle.dto';
import { UpdateClientDto } from './update-client.dto';

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
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus | string;

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
