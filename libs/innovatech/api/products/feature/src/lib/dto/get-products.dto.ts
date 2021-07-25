import { CommonFilterDto } from '@innovatech/api/core/util';
import { IsOptional } from 'class-validator';

export class GetProductsDto extends CommonFilterDto {
  @IsOptional()
  year: number;

  @IsOptional()
  horsePower: number;
}
