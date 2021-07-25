import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumber } from 'class-validator';

export class GetAdditionalOptionsDto extends ApsCollectionFilterDto {
  @IsNumber()
  productId?: number;
}
