import { Trim } from '@arphase/api';
import { UserRoles } from '@innovatech/common/domain';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondName?: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  secondLastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
