import { UpdateAddressDto } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { RevisionRequestStatus } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateRevisionRequestDto } from './create-revision-request.dto';

export class UpdateRevisionRequestDto extends PartialType(CreateRevisionRequestDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsOptional()
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
