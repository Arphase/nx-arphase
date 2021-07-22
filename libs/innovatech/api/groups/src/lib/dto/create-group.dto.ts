import { TransformEmail, Trim } from '@arphase/api';
import { CreateAddressDto, IsRfc } from '@innovatech/api/core/util';
import { Address, Company, User, UserRoles } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Trim()
  name: string;

  @IsString()
  @Trim()
  contact: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  @Trim()
  phone: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  companies: Company[];
}

export class CreateCompanyDto {
  @IsString()
  @Trim()
  businessName: string;

  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsString()
  @Trim()
  contact: string;

  @IsEmail()
  @TransformEmail()
  email: string;

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
  @IsString()
  @Trim()
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondName: string;

  @IsString()
  @Trim()
  lastName: string;

  @IsString()
  @Trim()
  secondLastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  @Trim()
  phone: string;

  @IsOptional()
  @Transform(({ obj, key }) => UserRoles[obj[key]])
  @IsEnum(UserRoles)
  role: UserRoles | string;
}
