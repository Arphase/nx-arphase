import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Address } from 'cluster';
import { User } from '@ivt/c-data';
import { CreateAddressDto } from '@ivt/a-guarantees';
import { CreateUserDto } from '@ivt/a-users';
import { IsRfc, RfcValidatorTypes } from '@ivt/c-utils'

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any , {
    message: 'rfc must have rfc format',
  })
  rfc: string;

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
  @Type(() => CreateUserDto)
  users: User[];
}
