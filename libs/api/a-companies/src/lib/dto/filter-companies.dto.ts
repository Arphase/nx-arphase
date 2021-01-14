import { convertStringToNumberArray } from '@ivt/c-utils';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class FilterCompaniesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: any) => convertStringToNumberArray(value))
  groupIds: number[];
}
