import { Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { SocialEvent } from '@musicr/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumberString, ValidateNested } from 'class-validator';

import { CreateOrderDto, CreateSocialEventDto } from './create-order.dto';

class CreateAddressDto {
  @IsNumberString()
  @Trim('zipcode')
  zipcode: string;
}

class CreateSocialEventQuoteDto extends PartialType(CreateSocialEventDto) {
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;
}

export class CreateOrderQuoteDto extends PartialType(CreateOrderDto) {
  @ValidateNested()
  @Type(() => CreateSocialEventQuoteDto)
  socialEvent: SocialEvent;
}
