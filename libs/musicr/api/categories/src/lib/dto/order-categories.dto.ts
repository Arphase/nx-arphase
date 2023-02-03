import { Category } from '@musicr/domain';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class OrderCategoriesDto {
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateCategoryPositionDto)
  categories: Partial<Category>[];
}

export class UpdateCategoryPositionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  position: number;
}
