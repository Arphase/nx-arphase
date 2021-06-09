import { RevisionStatus } from '@innovatech/common/domain';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  vehicleId: number;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;
}
