import { TransformEmail, Trim } from '@arphase/api/core';
import { IsEmail, IsString } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @Trim()
  firstName: string;

  @IsString()
  @Trim()
  lastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
