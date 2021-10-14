import { IsEmail, IsString } from 'class-validator';

export class SearchCustomersByEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
