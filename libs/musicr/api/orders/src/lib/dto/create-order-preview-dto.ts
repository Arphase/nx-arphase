import { OrderProduct } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { CreateOrderDto, CreateOrderProductDto } from './create-order.dto';

export class CreateOrderPreviewDto extends PartialType(CreateOrderDto) {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductDto)
  orderProducts: OrderProduct[];
}
