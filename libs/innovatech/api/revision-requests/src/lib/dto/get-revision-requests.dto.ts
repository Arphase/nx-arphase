import { CommonFilterDto } from '@innovatech/api/core/util';
import { RevisionRequestStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class GetRevisionRequestsDto extends CommonFilterDto {
  @IsOptional()
  @Transform((_, obj) => RevisionRequestStatus[obj['status']])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
