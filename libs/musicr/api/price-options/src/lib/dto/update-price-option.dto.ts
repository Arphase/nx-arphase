import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AssignPhotoDto } from './assign-photo.dto';

export class UpdatePriceOptionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AssignPhotoDto)
  photos: AssignPhotoDto[];
}
