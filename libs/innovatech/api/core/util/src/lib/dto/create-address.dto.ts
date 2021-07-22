import { Trim } from '@arphase/api';
import { IsNumberString, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumberString()
  @Trim()
  zipcode: string;

  @IsString()
  @Trim()
  country: string;

  @IsString()
  @Trim()
  state: string;

  @IsString()
  @Trim()
  city: string;

  @IsString()
  @Trim()
  suburb: string;

  @IsString()
  @Trim()
  street: string;

  @IsString()
  @Trim()
  externalNumber: string;

  @IsString()
  @Trim()
  internalNumber: string;
}
