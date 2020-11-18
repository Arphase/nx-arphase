import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  offset;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  limit;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
