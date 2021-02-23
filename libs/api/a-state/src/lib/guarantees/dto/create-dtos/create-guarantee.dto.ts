import { Client } from '@ivt/c-data';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateClientDto } from './create-client.dto';

export class CreateGuaranteeDto {
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: Client;

  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  productType: string;

  @IsNotEmpty()
  @IsNumber()
  kilometrageStart: number;

  @IsNotEmpty()
  @IsNumber()
  kilometrageEnd: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
