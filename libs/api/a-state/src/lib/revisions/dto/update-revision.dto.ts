import { RevisionReport, RevisionStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateRevisionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
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
  reviedBy: string;

  @IsOptional()
  @IsNumber()
  kilometrage: number;
}
