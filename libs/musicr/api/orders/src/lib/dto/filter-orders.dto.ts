import { ApsCollectionFilterDto } from '@arphase/api/core';
import { OrderTypes } from '@musicr/domain';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterOrdersDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsEnum(OrderTypes)
  orderType: OrderTypes;
}
