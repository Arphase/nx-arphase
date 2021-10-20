import { Photo } from '@valmira/domain';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

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

  @IsDate()
  releaseDate: Date;

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
