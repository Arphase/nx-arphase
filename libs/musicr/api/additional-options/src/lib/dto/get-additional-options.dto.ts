import { ApsCollectionFilterDto } from '@arphase/api';
import { IsNumberString } from 'class-validator';

export class GetAdditionalOptionsDto extends ApsCollectionFilterDto {
  @IsNumberString()
  productId?: number;
}
