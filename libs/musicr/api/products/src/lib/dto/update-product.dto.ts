import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AssignPhotoDto } from './assign-photo.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
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
  subcategoryId: number;

  @IsOptional()
  @IsArray()
  productComponents: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AssignPhotoDto)
  photos: AssignPhotoDto[];
}
