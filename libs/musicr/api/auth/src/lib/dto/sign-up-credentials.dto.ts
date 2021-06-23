import { TransformEmail, Trim } from '@arphase/api';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @TransformEmail()
  email: string;

  @IsString()
  password: string;
}
