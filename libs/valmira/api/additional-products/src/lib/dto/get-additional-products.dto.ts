import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetAdditionalProductsDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsBoolean()
  onlyActives?: boolean;
}
