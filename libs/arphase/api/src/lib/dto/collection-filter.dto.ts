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
  @IsString()
  sort?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  direction?: string;

  @IsOptional()
  @IsNotEmpty()
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  endDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dateType?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text?: string;
}
