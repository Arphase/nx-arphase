import { ApsCollectionFilterDto } from '@arphase/api/core';
import { PlaceCategories } from '@valmira/domain';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPlacesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsString()
  onlyActives?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @Transform(({ obj, key }) => PlaceCategories[obj[key]])
  @IsEnum(PlaceCategories)
  category: PlaceCategories;
}
