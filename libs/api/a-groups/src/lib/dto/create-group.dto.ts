import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '@ivt/a-companies';
import { Company } from '@ivt/c-data';
import { Type } from 'class-transformer';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  companies: Company[];
}
