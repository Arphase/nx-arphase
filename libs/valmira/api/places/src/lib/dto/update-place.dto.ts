import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
  @IsNumber()
  id: number;
}
