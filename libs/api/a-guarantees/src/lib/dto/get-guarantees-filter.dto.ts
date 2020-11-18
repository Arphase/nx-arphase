import { GuaranteeStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetGuaranteesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  offset;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
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
}
