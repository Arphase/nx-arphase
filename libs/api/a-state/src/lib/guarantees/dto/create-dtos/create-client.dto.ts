import { Address, MoralPerson, PersonTypes, PhysicalPerson } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { UpdateAddressDto } from '../../../addresses/dto/update-address.dto';
import { IsRfc } from '../../../validators';
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
  @IsRfc(RfcValidatorTypes.any, {
    message: 'RFC has incorrect format',
  })
  rfc: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsNotEmpty()
  salesPlace: string;
}
