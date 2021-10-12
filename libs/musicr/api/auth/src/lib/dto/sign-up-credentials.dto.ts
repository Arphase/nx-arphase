import { TransformEmail, Trim } from '@arphase/api/core';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
