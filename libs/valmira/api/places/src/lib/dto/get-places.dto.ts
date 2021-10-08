import { ApsCollectionFilterDto } from '@arphase/api/core';
import { PlaceCategories } from '@valmira/domain';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetPlacesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsBoolean()
  onlyActives?: boolean;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @Transform((_, obj) => PlaceCategories[obj['category']])
  @IsEnum(PlaceCategories)
  category: PlaceCategories;
}
