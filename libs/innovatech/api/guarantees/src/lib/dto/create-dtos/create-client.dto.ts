import { TransformEmail, Trim } from '@arphase/api/core';
import { Address } from '@arphase/common';
import { CreateAddressDto, IsRfc } from '@innovatech/api/core/util';
import { MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { CreateMoralPersonDto } from './create-moral-person.dto';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';

export class CreateClientDto {
  @Transform(({ obj, key }) => PersonTypes[obj[key]])
  @IsEnum(PersonTypes)
  personType: PersonTypes;

  @ValidateIf(client => client.personType === PersonTypes[PersonTypes.physical])
  @ValidateNested()
  @Type(() => CreatePhysicalPersonDto)
  physicalInfo: PhysicalPerson;

  @ValidateIf(client => client.personType === PersonTypes[PersonTypes.moral])
  @ValidateNested()
  @Type(() => CreateMoralPersonDto)
  moralInfo: MoralPerson;

  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsString()
  @Trim()
  phone: string;

  @IsEmail()
  @TransformEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @Trim()
  @IsString()
  salesPlace: string;
}
