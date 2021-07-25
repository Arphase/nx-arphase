import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreatePromocodeDto } from './create-promocode.dto';

export class UpdatePromocodeDto extends PartialType(CreatePromocodeDto) {
  @IsNumber()
  id: number;
}
