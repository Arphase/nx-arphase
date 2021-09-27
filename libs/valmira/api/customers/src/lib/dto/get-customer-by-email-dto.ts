import { IsString } from 'class-validator';

export class GetCustomerByEmailDto {
  @IsString()
  email: string;
}
