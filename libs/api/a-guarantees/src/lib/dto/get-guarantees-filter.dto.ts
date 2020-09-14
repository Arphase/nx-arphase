import { GuaranteeStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

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
  @IsNumberString()
  amount: number;

  @IsOptional()
  @Transform(value => GuaranteeStatus[value])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
