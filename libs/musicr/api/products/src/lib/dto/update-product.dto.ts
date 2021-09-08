import { AdditionalOption } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateAdditionalOptionDto, CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateAdditionalOptionDto)
  additionalOptions: AdditionalOption[];
}

export class UpdateAdditionalOptionDto extends PartialType(CreateAdditionalOptionDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}
