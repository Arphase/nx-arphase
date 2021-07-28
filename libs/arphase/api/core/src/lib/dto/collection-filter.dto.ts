import { DEFAULT_PAGE_SIZE } from '@arphase/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ApsCollectionFilterDto {
  @IsOptional()
  @IsNumber()
  pageSize?: number = DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsNumber()
  pageIndex?: number = 1;

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
