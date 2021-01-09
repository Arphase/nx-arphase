import { convertStringToNumberArray } from '@ivt/c-utils';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class FilterUsersDto {
  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: string) => convertStringToNumberArray(value))
  companyIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: string) => convertStringToNumberArray(value))
  groupIds: number[];
}
