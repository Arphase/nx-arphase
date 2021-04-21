import { RevisionReport, RevisionStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsNotEmpty()
  @IsString()
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
  reviewdBy: string;

  @IsNotEmpty()
  @IsNumber()
  kilometrage: number;
}
