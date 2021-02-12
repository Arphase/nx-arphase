import { GuaranteeStatus } from '@ivt/c-data';
import { convertStringToNumberArray } from '@ivt/c-utils';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetGuaranteesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageSize;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  pageIndex;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsNotEmpty()
  dateType: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @Transform(({ obj, key }) => GuaranteeStatus[obj[key]])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  groupIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  companyIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  userIds: number[];
}
