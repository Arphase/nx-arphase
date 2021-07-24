import { CommonFilterDto } from '@innovatech/api/core/util';
import { RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;
}
