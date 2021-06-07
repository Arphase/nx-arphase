import { Client } from '@innovatech/common/domain';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  productId: number;

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
