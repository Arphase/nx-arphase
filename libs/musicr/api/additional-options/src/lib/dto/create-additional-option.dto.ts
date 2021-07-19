import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdditionalOptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
