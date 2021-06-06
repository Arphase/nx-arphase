import { Guarantee } from '@innovatech/common/domain';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Transform(({ obj, key }) => Number(obj[key]))
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

  @IsNotEmpty()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minYear: number;

  @IsNotEmpty()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxYear: number;

  @IsNotEmpty()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minHp: number;

  @IsNotEmpty()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxHp: number;

  @IsOptional()
  @IsArray()
  guarantees: Partial<Guarantee>[];
}
