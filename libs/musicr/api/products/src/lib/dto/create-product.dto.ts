import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AssignPhotoDto } from './assign-photo.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  disclaimer?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  subcategoryId: number;

  @IsNotEmpty()
  @IsArray()
  productComponents: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AssignPhotoDto)
  photos: AssignPhotoDto[];
}
