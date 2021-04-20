import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetProductsDto extends CommonFilterDto {
  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  year: number;

  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  @IsNumber()
  horsePower: number;
}
