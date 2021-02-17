import { Address, RevisionRequestStatus } from '@ivt/c-data';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateAddressDto } from '../../addresses';

export class UpdateRevisionRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsOptional()
  @Transform(({ obj, key }) => RevisionRequestStatus[obj[key]])
  @IsEnum(RevisionRequestStatus)
  status: RevisionRequestStatus;
}
