import { Address } from '@ivt/c-data';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { CreateAddressDto } from '../../addresses';

export class CreateRevisionRequestDto {
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
}
