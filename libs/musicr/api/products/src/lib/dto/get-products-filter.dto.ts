import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumber, IsOptional } from 'class-validator';

export class GetProductsFilterDto extends ApsCollectionFilterDto {
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  subcategoryId?: number;
}
