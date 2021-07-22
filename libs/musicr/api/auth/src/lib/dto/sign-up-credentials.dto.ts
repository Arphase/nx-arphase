import { TransformEmail, Trim } from '@arphase/api';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @Trim()
  firstName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondName?: string;

  @IsString()
  @Trim()
  lastName: string;

  @IsString()
  @Trim()
  secondLastName: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
