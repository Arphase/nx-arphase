import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AssignPhotoDto } from './assign-photo.dto';

export class CreatePriceOptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AssignPhotoDto)
  photos: AssignPhotoDto[];
}
