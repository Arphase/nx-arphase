import { Guarantee } from '@ivt/c-data';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {

  @IsNotEmpty()
  @Transform(value => Number(value))
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  template: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsOptional()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
