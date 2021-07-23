import { ApsCollectionFilterDto } from '@arphase/api';
import { IsNumberString } from 'class-validator';

export class GetPriceOptionsDto extends ApsCollectionFilterDto {
  @IsNumberString()
  productId?: number;
}
