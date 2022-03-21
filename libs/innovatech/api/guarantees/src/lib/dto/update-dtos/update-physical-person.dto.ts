import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';

import { CreatePhysicalPersonDto } from '../create-dtos/create-physical-person.dto';

export class UpdatePhysicalPersonDto extends PartialType(CreatePhysicalPersonDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}
