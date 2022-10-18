import { Trim } from '@arphase/api/core';
import { RevisionReport, RevisionStatus } from '@innovatech/common/domain';
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsString()
  @Trim('observations')
  observations: string;

  @IsEnum(RevisionStatus)
  status: RevisionStatus;

  @IsNumber()
  vehicleId: number;

  @IsObject()
  report: RevisionReport;

  @IsString()
  @Trim('reviewdBy')
  reviewdBy: string;

  @IsNumber()
  kilometrage: number;
}
