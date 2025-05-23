import { TransformEmail, Trim } from '@arphase/api/core';
import { IsEmail, IsString } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @Trim('firstName')
  firstName: string;

  @IsString()
  @Trim('lastName')
  lastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
