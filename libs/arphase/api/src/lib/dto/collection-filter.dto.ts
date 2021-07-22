import { DEFAULT_PAGE_SIZE } from '@arphase/common';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ApsCollectionFilterDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageSize? = DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageIndex? = 1;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  direction?: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsString()
  dateType?: string;

  @IsOptional()
  @IsString()
  text?: string;
}
