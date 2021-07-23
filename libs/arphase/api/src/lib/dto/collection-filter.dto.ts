import { DEFAULT_PAGE_SIZE } from '@arphase/common';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ApsCollectionFilterDto {
  @IsOptional()
  @IsNumberString()
  pageSize? = DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsNumberString()
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
