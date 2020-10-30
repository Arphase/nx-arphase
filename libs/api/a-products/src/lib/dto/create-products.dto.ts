import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateProductDto {

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsString()
  template: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
