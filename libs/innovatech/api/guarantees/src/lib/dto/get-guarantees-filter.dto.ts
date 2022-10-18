import { CommonFilterDto } from '@innovatech/api/core/util';
import { GuaranteeStatus } from '@innovatech/common/domain';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetGuaranteesFilterDto extends CommonFilterDto {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
