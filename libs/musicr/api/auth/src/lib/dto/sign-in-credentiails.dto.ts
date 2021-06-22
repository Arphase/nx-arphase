import { TransformEmail } from '@arphase/api';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @TransformEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
