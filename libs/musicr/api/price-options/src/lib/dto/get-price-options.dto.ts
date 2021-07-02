import { ApsCollectionFilterDto } from '@arphase/api';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetPriceOptionsDto extends ApsCollectionFilterDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ obj, key }) => Number([obj[key]]))
  productId?: number;
}
