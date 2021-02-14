import { DEFAULT_LIMIT_SIZE } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetRevisionsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageSize = DEFAULT_LIMIT_SIZE;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageIndex = 1;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  vehicleId;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;
}
