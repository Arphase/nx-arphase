import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreateRevisionDto } from './create-revision.dto';

export class UpdateRevisionDto extends PartialType(CreateRevisionDto) {
  @IsNumber()
  id: number;
}
