import { CreateAddressDto, TransformEmail, Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
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

  @IsString()
  additionalNotes: string;

  @IsNumber()
  vehicleId: number;
}
