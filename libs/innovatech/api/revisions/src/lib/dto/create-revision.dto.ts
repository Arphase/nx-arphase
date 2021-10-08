import { Trim } from '@arphase/api/core';
import { RevisionReport, RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsString()
  @Trim()
  observations: string;

  @Transform((_, obj) => RevisionStatus[obj['status']])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;

  @IsNumber()
  vehicleId: number;

  @IsObject()
  report: RevisionReport;

  @IsString()
  @Trim()
  reviewdBy: string;

  @IsNumber()
  kilometrage: number;
}
