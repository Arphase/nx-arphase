import { Trim } from '@arphase/api';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  price: number;

  @IsString()
  template: string;

  @IsString()
  @Trim()
  name: string;

  @IsString()
  logo: string;

  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minYear: number;

  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxYear: number;

  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  minHp: number;

  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  maxHp: number;
}
