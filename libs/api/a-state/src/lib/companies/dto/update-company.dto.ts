import { Address, User } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';
import { UpdateUserDto } from '../../users';
import { IsRfc } from '../../validators';

export class UpdateCompanyDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, {
    message: 'RFC has incorrect format',
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
