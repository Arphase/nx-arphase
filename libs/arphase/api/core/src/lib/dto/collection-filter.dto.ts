import { DEFAULT_PAGE_SIZE, SortDirection } from '@arphase/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Trim } from '../decorators/trim.decorator';

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
  direction?: keyof typeof SortDirection;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsString()
  dateType?: string;

  @IsOptional()
  @IsString()
  @Trim('text')
  text?: string;
}
