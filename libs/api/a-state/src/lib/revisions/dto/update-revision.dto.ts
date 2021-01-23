import { RevisionStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
}
