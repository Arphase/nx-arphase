import { Trim } from '@arphase/api';
import { IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumberString()
  price: number;

  @IsString()
  template: string;

  @IsString()
  @Trim()
  name: string;

  @IsString()
  logo: string;

  @IsNumberString()
  minYear: number;

  @IsNumberString()
  maxYear: number;

  @IsNumberString()
  minHp: number;

  @IsNumberString()
  maxHp: number;
}
