import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '@ivt/c-data';
import { IsRfc, RfcValidatorTypes } from '@ivt/c-utils'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, {
    message: 'rfc must have rfc format',
  })
  rfc: string;

  @Transform(value => UserRoles[value])
  @IsEnum(UserRoles)
  role: UserRoles | string;
}
