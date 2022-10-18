import { CommonFilterDto } from '@innovatech/api/core/util';
import { RevisionRequestStatus } from '@innovatech/common/domain';
import { IsEnum, IsOptional } from 'class-validator';

export class GetRevisionRequestsDto extends CommonFilterDto {
  @IsOptional()
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
