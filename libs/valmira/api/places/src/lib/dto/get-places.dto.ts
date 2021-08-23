import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsOptional, IsString } from 'class-validator';

export class GetPlacesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsString()
  onlyActives?: string;
}
