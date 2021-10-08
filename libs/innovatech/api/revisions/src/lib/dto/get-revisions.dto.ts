import { CommonFilterDto } from '@innovatech/api/core/util';
import { RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @Transform((_, obj) => RevisionStatus[obj['status']])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;
}
