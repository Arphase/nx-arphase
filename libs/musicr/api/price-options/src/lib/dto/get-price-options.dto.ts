import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumberString } from 'class-validator';

export class GetPriceOptionsDto extends ApsCollectionFilterDto {
  @IsNumberString()
  productId?: number;
}
