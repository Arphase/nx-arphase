import { CommonFilterDto } from '@innovatech/api/core/util';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

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
