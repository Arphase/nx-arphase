import { AdditionalOption, Photo, PriceOption } from '@musicr/domain';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  popularity: number;

  @IsOptional()
  @IsBoolean()
  hasActivePromotion: boolean;

  @IsOptional()
  @IsNumber()
  promotionDiscount: number;

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
  @Type(() => CreatePriceOptionDto)
  priceOptions: PriceOption[];

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

export class CreatePriceOptionDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsBoolean()
  includedInPromotion: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductPhotoDto)
  photos: Photo[];
}

export class CreateAdditionalOptionDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsBoolean()
  includedInPromotion: boolean;
}
