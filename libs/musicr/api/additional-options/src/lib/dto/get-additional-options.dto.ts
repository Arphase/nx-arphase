import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsNumberString } from 'class-validator';

export class GetAdditionalOptionsDto extends ApsCollectionFilterDto {
  @IsNumberString()
  productId?: number;
}
