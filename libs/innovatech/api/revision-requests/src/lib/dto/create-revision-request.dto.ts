import { TransformEmail, Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { CreateAddressDto } from '@innovatech/api/core/util';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateRevisionRequestDto {
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsString()
  @Trim('name')
  name: string;

  @IsString()
  @Trim('phone')
  phone: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsNumber()
  vehicleId: number;
}
