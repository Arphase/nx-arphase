import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPlacesDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsString()
  onlyActives?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;
}
