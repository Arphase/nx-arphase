import { UpdateAddressDto } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { CreateClientDto } from '../create-dtos/create-client.dto';
import { UpdateMoralPersonDto } from './update-moral-person.dto';
import { UpdatePhysicalPersonDto } from './update-physical-person.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateIf(client => client.personType === PersonTypes.physical)
  @ValidateNested()
  @Type(() => UpdatePhysicalPersonDto)
  physicalInfo: PhysicalPerson;

  @IsOptional()
  @ValidateIf(client => client.personType === PersonTypes.moral)
  @ValidateNested()
  @Type(() => UpdateMoralPersonDto)
  moralInfo: MoralPerson;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;
}
