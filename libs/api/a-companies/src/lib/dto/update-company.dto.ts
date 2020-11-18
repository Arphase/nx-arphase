import { UpdateAddressDto } from '@ivt/a-guarantees';
import { UpdateUserDto } from '@ivt/a-users';
import { Address, User } from '@ivt/c-data';
import { IsRfc, RfcValidatorTypes } from '@ivt/c-utils';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, {
    message: 'rfc must have rfc format',
  })
  rfc: string;

  @IsOptional()
  @IsString()
  contact: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  users: User[];
}
