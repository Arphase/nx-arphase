import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  disclaimer?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  subcategoryId: number;

  @IsOptional()
  @IsArray()
  productComponents: string[];

  @IsOptional()
  @IsNumber({}, { each: true })
  photoIds: number[];
}
