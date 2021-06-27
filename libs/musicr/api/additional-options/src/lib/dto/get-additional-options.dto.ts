import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAdditionalOptionsDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ obj, key }) => Number([obj[key]]))
  productId?: number;
}
