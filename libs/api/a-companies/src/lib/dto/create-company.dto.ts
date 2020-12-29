import { CreateAddressDto } from '@ivt/a-guarantees';
import { IsRfc } from '@ivt/a-state';
import { CreateUserDto } from '@ivt/a-users';
import { User } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Address } from 'cluster';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, {
    message: 'RFC has incorrect format',
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
