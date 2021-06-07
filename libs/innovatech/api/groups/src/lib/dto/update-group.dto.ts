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

export class UpdateCompanyDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
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

export class UpdateUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
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
