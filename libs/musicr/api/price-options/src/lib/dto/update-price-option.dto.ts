import { IsNumber } from 'class-validator';
import { CreatePriceOptionDto } from './create-price-option.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePriceOptionDto extends PartialType(CreatePriceOptionDto) {
  @IsNumber()
  id: number;
}
