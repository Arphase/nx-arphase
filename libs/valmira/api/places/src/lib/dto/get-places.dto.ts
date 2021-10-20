import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class GetPlacesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsBoolean()
  onlyActives?: boolean;

  @IsOptional()
  @IsNumber()
  capacity?: number;
}
