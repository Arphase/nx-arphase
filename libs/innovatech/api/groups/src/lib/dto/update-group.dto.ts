import { LowerCase, Trim } from '@arphase/api';
import { IsRfc, UpdateAddressDto } from '@innovatech/api/core/util';
import { Address, Company, User, UserRoles } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateGroupDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @Trim()
  contact: string;

  @IsOptional()
  @IsEmail()
  @LowerCase()
  @Trim()
  email: string;

  @IsOptional()
  @IsString()
  @Trim()
  phone: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateCompanyDto)
  companies: Company[];
}

export class UpdateCompanyDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  @Trim()
  businessName: string;

  @IsOptional()
  @IsString()
  @Trim()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsOptional()
  @IsString()
  @Trim()
  contact: string;

  @IsOptional()
  @IsEmail()
  @LowerCase()
  @Trim()
  email: string;

  @IsOptional()
  @IsString()
  @Trim()
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

export class UpdateUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Trim()
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Trim()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Trim()
  secondLastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @LowerCase()
  @Trim()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Trim()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsOptional()
  @Transform(({ obj, key }) => UserRoles[obj[key]])
  @IsEnum(UserRoles)
  role: UserRoles | string;
}
