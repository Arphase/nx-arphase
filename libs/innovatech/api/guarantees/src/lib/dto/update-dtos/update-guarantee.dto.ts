import { Trim } from '@arphase/api';
import { Client, GuaranteeStatus } from '@innovatech/common/domain';
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
  @IsNumber()
  vehicleId: number;

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
  @IsNumber()
  kilometrageStart: number;

  @IsOptional()
  @IsNumber()
  kilometrageEnd: number;

  @IsOptional()
  @IsNumber()
  companyId: number;
}
