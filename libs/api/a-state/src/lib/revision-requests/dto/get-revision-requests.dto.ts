import { RevisionRequestStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetRevisionRequestsDto extends CommonFilterDto {
  @IsOptional()
  @Transform(({ obj, key }) => RevisionRequestStatus[obj[key]])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
