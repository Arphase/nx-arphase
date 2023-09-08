import { CreateAddressDto, TransformEmail, Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { IsRfc } from '@innovatech/api/core/util';
import { MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { CreateMoralPersonDto } from './create-moral-person.dto';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';

export class CreateClientDto {
  @IsEnum(PersonTypes)
  personType: PersonTypes;

  @ValidateIf(client => client.personType === PersonTypes.physical)
  @ValidateNested()
  @Type(() => CreatePhysicalPersonDto)
  physicalInfo: PhysicalPerson;

  @ValidateIf(client => client.personType === PersonTypes.moral)
  @ValidateNested()
  @Type(() => CreateMoralPersonDto)
  moralInfo: MoralPerson;

  @IsOptional()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsString()
  @Trim('phone')
  phone: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsString()
  @Trim('salesPlace')
  salesPlace: string;
}
