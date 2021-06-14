import { Trim } from '@arphase/api';
import { RevisionReport, RevisionStatus } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateRevisionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @Trim()
  observations: string;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionStatus[obj[key]])
  @IsEnum(RevisionStatus)
  status: RevisionStatus;

  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @IsObject()
  report: RevisionReport;

  @IsOptional()
  @IsString()
  @Trim()
  reviedBy: string;

  @IsOptional()
  @IsNumber()
  kilometrage: number;
}
