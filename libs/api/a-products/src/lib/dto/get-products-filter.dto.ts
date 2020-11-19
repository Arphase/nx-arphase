import { Guarantee } from '@ivt/c-data'
import { IsOptional, IsNotEmpty, IsNumber, IsString , IsArray, IsNumberString} from 'class-validator';

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
  @IsNumber()
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
