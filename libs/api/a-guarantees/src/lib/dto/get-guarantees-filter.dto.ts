import { GuaranteeStatus } from '@ivt/c-data';
import { convertStringToNumberArray } from '@ivt/c-utils';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetGuaranteesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  offset;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  limit;

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
  @Transform(value => GuaranteeStatus[value])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: string) => convertStringToNumberArray(value))
  groupIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: string) => convertStringToNumberArray(value))
  companyIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform((value: string) => convertStringToNumberArray(value))
  userIds: number[];
}
