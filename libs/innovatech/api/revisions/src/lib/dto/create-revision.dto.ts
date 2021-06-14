import { Trim } from '@arphase/api';
import { RevisionReport, RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  observations: string;

  @IsNotEmpty()
  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;

  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;

  @IsNotEmpty()
  @IsObject()
  report: RevisionReport;

  @IsNotEmpty()
  @IsString()
  @Trim()
  reviewdBy: string;

  @IsNotEmpty()
  @IsNumber()
  kilometrage: number;
}
