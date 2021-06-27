import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdditionalOptionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
