import { Photo, PlaceCategories } from '@valmira/domain';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  area: number;

  @IsNumber()
  weeklyPrice: number;

  @IsNumber()
  weekendPrice: number;

  @IsNumber()
  rooms: number;

  @IsNumber()
  beds: number;

  @Transform((_, obj) => PlaceCategories[obj['category']])
  @IsEnum(PlaceCategories)
  category: PlaceCategories;

  @IsString({ each: true })
  services: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => CreatePlacePhotoDto)
  photos: Photo[];
}

export class CreatePlacePhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  key: string;

  @IsString()
  path: string;
}
