import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

import { CreateAdditionalProductDto } from './create-additional-product.dto';

export class UpdateAdditionalProductDto extends PartialType(CreateAdditionalProductDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
