import { Address } from '@arphase/common';
import { UpdateAddressDto } from '@innovatech/api/core/util';
import { RevisionRequestStatus } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
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
  @Transform((_, obj) => RevisionRequestStatus[obj['status']])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
