import { Trim } from '@arphase/api';
import { IsRfc, UpdateAddressDto } from '@innovatech/api/core/util';
import { Address, MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { CreateMoralPersonDto } from './create-moral-person.dto';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';

export class CreateClientDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  @IsRfc(RfcValidatorTypes.any, { message: 'RFC tiene formato incorrecto' })
  rfc: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsNotEmpty()
  @Trim()
  salesPlace: string;
}
