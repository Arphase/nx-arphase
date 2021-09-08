import { AdditionalOption, Photo } from '@musicr/domain';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductPhotoDto)
  photos: Photo[];

  @IsArray()
  @ValidateNested()
  @Type(() => CreateAdditionalOptionDto)
  additionalOptions: AdditionalOption[];
}

export class CreateProductPhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  key: string;

  @IsString()
  url: string;
}

export class CreateAdditionalOptionDto {
  @IsString()
  name: string;

  @IsString()
  price: string;
}
