import { TransformEmail } from '@arphase/api';
import { IsEmail, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
