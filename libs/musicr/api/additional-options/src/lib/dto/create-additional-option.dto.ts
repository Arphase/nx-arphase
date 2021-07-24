import { IsNumber, IsString } from 'class-validator';

export class CreateAdditionalOptionDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  productId: number;
}
