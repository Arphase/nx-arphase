import { UpdateAddressDto } from '@innovatech/api/core/util';
import { Address, Company, User } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { CreateCompanyDto, CreateGroupDto, CreateUserDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateCompanyDto)
  companies: Company[];
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  users: User[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber()
  id: number;
}
