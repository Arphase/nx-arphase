import { Trim } from '@arphase/api';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minYear: number;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxYear: number;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minHp: number;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxHp: number;
}
