import { Trim } from '@arphase/api/core';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  price: number;

  @IsString()
  template: string;

  @IsString()
  @Trim('name')
  name: string;

  @IsString()
  logo: string;

  @IsNumber()
  minYear: number;

  @IsNumber()
  maxYear: number;

  @IsNumber()
  minHp: number;

  @IsNumber()
  maxHp: number;
}
