import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceOptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  photoIds: number[];

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
