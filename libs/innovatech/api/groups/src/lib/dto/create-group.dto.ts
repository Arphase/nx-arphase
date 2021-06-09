import { LowerCase, Trim } from '@arphase/api';
import { CreateAddressDto, IsRfc } from '@innovatech/api/core/util';
import { Address, Company, User, UserRoles } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  contact: string;

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @LowerCase()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  phone: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  companies: Company[];
}

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  contact: string;

  @IsNotEmpty()
  @IsEmail()
  @LowerCase()
  @Trim()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
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
  @IsNotEmpty()
  @IsString()
  @Trim()
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  secondLastName: string;

  @IsNotEmpty()
  @IsEmail()
  @LowerCase()
  @Trim()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  phone: string;

  @IsOptional()
  @Transform(({ obj, key }) => UserRoles[obj[key]])
  @IsEnum(UserRoles)
  role: UserRoles | string;
}
