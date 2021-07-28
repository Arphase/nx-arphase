import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreateAdditionalOptionDto } from './create-additional-option.dto';

export class UpdateAdditionalOptionDto extends PartialType(CreateAdditionalOptionDto) {
  @IsNumber()
  id: number;
}
