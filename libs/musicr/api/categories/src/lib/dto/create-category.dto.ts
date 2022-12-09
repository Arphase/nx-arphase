import { Photo } from '@musicr/domain';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => CreateCategoryPhotoDto)
  photo: Photo;
}

export class CreateCategoryPhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  key: string;

  @IsString()
  url: string;
}
