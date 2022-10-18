import { CommonFilterDto } from '@innovatech/api/core/util';
import { RevisionStatus } from '@innovatech/common/domain';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @IsEnum(RevisionStatus)
  status: RevisionStatus;
}
