import { IsNumber, IsString } from 'class-validator';

export class CreateAdditionalProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
