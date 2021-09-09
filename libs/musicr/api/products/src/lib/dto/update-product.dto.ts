import { AdditionalOption, PriceOption } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateAdditionalOptionDto, CreatePriceOptionDto, CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdatePriceOptionDto)
  priceOptions: PriceOption[];

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateAdditionalOptionDto)
  additionalOptions: AdditionalOption[];
}

export class UpdatePriceOptionDto extends PartialType(CreatePriceOptionDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}

export class UpdateAdditionalOptionDto extends PartialType(CreateAdditionalOptionDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}
