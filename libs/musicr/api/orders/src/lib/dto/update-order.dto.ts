import { UpdateAddressDto } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { OrderProduct, OrderProductAdditionalOption, SocialEvent } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import {
  CreateOrderDto,
  CreateOrderProductAdditionalOptionDto,
  CreateOrderProductDto,
  CreateSocialEventDto,
} from './create-order.dto';

export class UpdateSocialEventDto extends PartialType(CreateSocialEventDto) {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateOrderProductAdditionalOptionDto)
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}

export class UpdateOrderProductAdditionalOptionDto extends PartialType(CreateOrderProductAdditionalOptionDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => UpdateSocialEventDto)
  socialEvent: SocialEvent;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateOrderProductDto)
  orderProducts: OrderProduct[];
}
