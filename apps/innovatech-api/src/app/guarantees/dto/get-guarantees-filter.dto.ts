import {
  IsOptional,
  IsNotEmpty,
  IsNumberString,
  IsString,
  isNumberString,
  IsDateString,
  IsDate,
  IsEnum,
} from 'class-validator';
import { GuaranteeStatus } from '@ivt/data';
import { Transform } from 'class-transformer';

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
  @IsString()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @IsOptional()
  @Transform((value) => GuaranteeStatus[value])
  @IsEnum(GuaranteeStatus)
  status: GuaranteeStatus;
}
