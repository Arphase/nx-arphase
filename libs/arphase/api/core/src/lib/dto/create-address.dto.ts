import { IsNumberString, IsOptional, IsString } from 'class-validator';

import { Trim } from '../decorators/trim.decorator';

export class CreateAddressDto {
  @IsNumberString()
  @Trim('zipcode')
  zipcode: string;

  @IsString()
  @Trim('country')
  country: string;

  @IsString()
  @Trim('state')
  state: string;

  @IsString()
  @Trim('city')
  city: string;

  @IsString()
  @Trim('suburb')
  suburb: string;

  @IsString()
  @Trim('street')
  street: string;

  @IsString()
  @Trim('externalNumber')
  externalNumber: string;

  @IsOptional()
  @IsString()
  @Trim('internalNumber')
  internalNumber: string;
}
