import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumber } from 'class-validator';

export class GetPriceOptionsDto extends ApsCollectionFilterDto {
  @IsNumber()
  productId?: number;
}
