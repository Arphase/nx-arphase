import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreateAdditionalProductDto } from './create-additional-product.dto';

export class UpdateAdditionalProductDto extends PartialType(CreateAdditionalProductDto) {
  @IsNumber()
  id: number;
}
