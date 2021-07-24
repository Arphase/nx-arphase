import { Client } from '@innovatech/common/domain';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateClientDto } from './create-client.dto';

export class CreateGuaranteeDto {
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: Client;

  @IsNumber()
  vehicleId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  productId: number;

  @IsNumber()
  kilometrageStart: number;

  @IsNumber()
  kilometrageEnd: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
