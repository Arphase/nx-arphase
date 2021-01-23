import { Company } from '@ivt/c-data';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateCompanyDto } from '../../companies';

export class UpdateGroupDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contact: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateCompanyDto)
  companies: Company[];
}
