import { DEFAULT_LIMIT_SIZE } from '@ivt/c-data';
import { convertStringToNumberArray } from '@ivt/c-utils';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FilterUsersDto {
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
  text: string;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  companyIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  groupIds: number[];
}
