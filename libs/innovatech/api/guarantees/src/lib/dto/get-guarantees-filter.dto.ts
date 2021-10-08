import { CommonFilterDto } from '@innovatech/api/core/util';
import { GuaranteeStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetGuaranteesFilterDto extends CommonFilterDto {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @Transform((_, obj) => GuaranteeStatus[obj['status']])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
