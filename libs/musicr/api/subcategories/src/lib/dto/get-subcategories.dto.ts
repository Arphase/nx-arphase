import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumber, IsOptional } from 'class-validator';

export class GetSubcategoriesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsNumber()
  categoryId: number;
}
