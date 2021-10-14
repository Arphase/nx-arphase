import { TransformEmail, Trim } from '@arphase/api/core';
import { UserRoles } from '@innovatech/common/domain';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignUpCredentialsDto {
  @IsString()
  @Trim('firstName')
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim('secondName')
  secondName?: string;

  @IsString()
  @Trim('lastName')
  lastName: string;

  @IsString()
  @Trim('secondLastName')
  secondLastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
