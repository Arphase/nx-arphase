import { ApsCollectionFilterDto } from '@arphase/api/core';
import { EventType } from '@musicr/domain';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class GetProductsFilterDto extends ApsCollectionFilterDto {
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  subcategoryId?: number;

  @IsArray()
  @Transform((_, obj) =>
    String(obj['eventTypes'])
      .split(',')
      .filter(eventType => !!eventType),
  )
  @IsOptional()
  eventTypes?: EventType[];

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;
}
