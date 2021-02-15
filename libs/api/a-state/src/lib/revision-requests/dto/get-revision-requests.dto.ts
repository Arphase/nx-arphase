import { DEFAULT_LIMIT_SIZE } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetRevisionRequestsDto {
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
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;
}
