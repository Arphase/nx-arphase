import { UpdateAddressDto } from '@innovatech/api/core/util';
import { Address, RevisionRequestStatus } from '@innovatech/common/domain';
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
  @Transform(({ obj, key }) => RevisionRequestStatus[obj[key]])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
