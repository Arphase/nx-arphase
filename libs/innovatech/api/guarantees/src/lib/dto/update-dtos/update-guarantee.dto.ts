import { Client, GuaranteeStatus } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateGuaranteeDto } from '../create-dtos/create-guarantee.dto';
import { UpdateClientDto } from './update-client.dto';

export class UpdateGuaranteeDto extends PartialType(CreateGuaranteeDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateClientDto)
  client: Client;

  @IsOptional()
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
