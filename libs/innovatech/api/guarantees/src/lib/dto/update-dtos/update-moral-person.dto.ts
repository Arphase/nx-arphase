import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreateMoralPersonDto } from '../create-dtos/create-moral-person.dto';

export class UpdateMoralPersonDto extends PartialType(CreateMoralPersonDto) {
  @IsNumber()
  id: number;
}
