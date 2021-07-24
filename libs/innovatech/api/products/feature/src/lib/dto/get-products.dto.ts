import { CommonFilterDto } from '@innovatech/api/core/util';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsDto extends CommonFilterDto {
  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsNumberString()
  horsePower: number;
}
