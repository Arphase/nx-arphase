import { Product } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { CreateSubcategoryDto } from './create-subcategory.dto';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateProductDto)
  products: Partial<Product>[];
}

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsNumber()
  position: number;
}
