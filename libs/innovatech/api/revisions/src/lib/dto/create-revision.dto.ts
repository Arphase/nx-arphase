import { Trim } from '@arphase/api';
import { RevisionReport, RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsString()
  @Trim()
  observations: string;

  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
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
