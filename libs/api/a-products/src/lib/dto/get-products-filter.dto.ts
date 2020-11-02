import { IsOptional, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  offset;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  limit;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  price;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}