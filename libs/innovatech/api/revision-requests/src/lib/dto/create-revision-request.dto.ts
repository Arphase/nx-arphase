import { TransformEmail, Trim } from '@arphase/api';
import { CreateAddressDto } from '@innovatech/api/core/util';
import { Address } from '@innovatech/common/domain';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateRevisionRequestDto {
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsString()
  @Trim()
  name: string;

  @IsString()
  @Trim()
  phone: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsNumber()
  vehicleId: number;
}
