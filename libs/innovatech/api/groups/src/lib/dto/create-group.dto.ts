import { CreateAddressDto, TransformEmail, Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { IsRfc } from '@innovatech/api/core/util';
import { Company, User, UserRoles } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Trim('name')
  name: string;

  @IsString()
  @Trim('contact')
  contact: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  @Trim('phone')
  phone: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  companies: Partial<Company>[];
}

export class CreateCompanyDto {
  @IsString()
  @Trim('businessName')
  businessName: string;

  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsString()
  @Trim('contact')
  contact: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  @Trim('phone')
  phone: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateUserDto)
  users: User[];
}

export class CreateUserDto {
  @IsString()
  @Trim('firstName')
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim('secondName')
  secondName: string;

  @IsString()
  @Trim('lastName')
  lastName: string;

  @IsString()
  @Trim('secondLastName')
  secondLastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  @Trim('phone')
  phone: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;
}
