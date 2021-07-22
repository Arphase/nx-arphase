import { ApsCollectionFilterDto } from '@arphase/api';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetAdditionalOptionsDto extends ApsCollectionFilterDto {
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  productId?: number;
}
