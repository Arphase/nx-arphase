import { Guarantee } from '@ivt/c-data'
import { IsOptional, IsNotEmpty, IsNumberString, IsString ,IsArray} from 'class-validator';

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

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}