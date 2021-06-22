import { DEFAULT_PAGE_SIZE } from '@arphase/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApsCollectionFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageSize? = DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageIndex? = 1;

  @IsOptional()
  @IsNotEmpty()
  sort?: string;

  @IsOptional()
  @IsNotEmpty()
  direction?: string;

  @IsOptional()
  @IsNotEmpty()
  startDate?: string;

  @IsOptional()
  @IsNotEmpty()
  endDate?: string;

  @IsOptional()
  @IsNotEmpty()
  dateType?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text?: string;
}
