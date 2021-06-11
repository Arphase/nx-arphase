import { TransformEmail, Trim } from '@arphase/api';
import { CreateAddressDto } from '@innovatech/api/core/util';
import { Address } from '@innovatech/common/domain';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateRevisionRequestDto {
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @TransformEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
}
