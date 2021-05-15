import { RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  vehicleId;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;
}
