import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsNumberString()
  zipcode: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  suburb: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  streetNumber: string;
}
