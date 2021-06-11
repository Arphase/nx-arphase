import { TransformEmail, Trim } from '@arphase/api';
import { UpdateAddressDto } from '@innovatech/api/core/util';
import { Address, RevisionRequestStatus } from '@innovatech/common/domain';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateRevisionRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsOptional()
  @IsString()
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @Trim()
  phone: string;

  @IsOptional()
  @IsEmail()
  @TransformEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionRequestStatus[obj[key]])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
