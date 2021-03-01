import { GuaranteeStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetGuaranteesFilterDto extends CommonFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @Transform(({ obj, key }) => GuaranteeStatus[obj[key]])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
