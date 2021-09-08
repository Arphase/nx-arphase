import { AdditionalOption } from '@musicr/domain';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AssignPhotoDto } from './assign-photo.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  disclaimer?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  subcategoryId: number;

  @IsArray()
  productComponents: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => CreateAdditionalOptionDto)
  additionalOptions: AdditionalOption[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AssignPhotoDto)
  photos: AssignPhotoDto[];
}

export class CreateAdditionalOptionDto {
  @IsString()
  name: string;

  @IsString()
  price: string;
}
