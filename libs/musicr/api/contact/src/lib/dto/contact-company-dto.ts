import { IsEmail, IsString } from 'class-validator';

export class ContactCompanyDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
