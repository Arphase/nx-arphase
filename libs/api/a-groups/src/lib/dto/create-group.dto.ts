import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '@ivt/a-companies';
import { Address, Company } from '@ivt/c-data';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '@ivt/a-guarantees';

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

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  companies: Company[];
}
