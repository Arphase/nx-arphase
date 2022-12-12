import { Subcategory } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateSubcategoryDto)
  subcategories: Partial<Subcategory>[];
}

export class UpdateSubcategoryDto {
  @IsNumber()
  id: number;

  @IsNumber()
  position: number;
}
