import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { UserRoles } from '@ivt/c-data';
import { IsRfc, RfcValidatorTypes } from '@ivt/c-utils';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
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
