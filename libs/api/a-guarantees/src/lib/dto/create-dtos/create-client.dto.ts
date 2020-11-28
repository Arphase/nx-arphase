import { IsRfc } from '@ivt/a-state';
import { MoralPerson, PersonTypes, PhysicalPerson } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Address } from 'cluster';

import { CreateAddressDto } from './create-address.dto';
import { CreateMoralPersonDto } from './create-moral-person.dto';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';

export class CreateClientDto {
  @IsNotEmpty()
  @Transform(value => PersonTypes[value])
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
  @IsRfc(RfcValidatorTypes.personType, {
    message: 'rfc must have the format of the person type',
  })
  rfc: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @IsNotEmpty()
  salesPlace: string;
}
