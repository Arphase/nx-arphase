import { PersonTypes, PhysicalPerson, MoralPerson } from '@ivt/data';
import { Address } from 'cluster';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsEmail,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';
import { CreateMoralPersonDto } from './create-moral-person.dto';
import { IsRfc } from '../custom-validators';

export class CreateClientDto {
  @IsNotEmpty()
  @IsEnum(PersonTypes)
  personType: PersonTypes;

  @ValidateIf((client) => client.personType === PersonTypes.physical)
  @ValidateNested()
  @Type(() => CreatePhysicalPersonDto)
  physicalInfo: PhysicalPerson;

  @ValidateIf((client) => client.personType === PersonTypes.moral)
  @ValidateNested()
  @Type(() => CreateMoralPersonDto)
  moralInfo: MoralPerson;

  @IsNotEmpty()
  @IsString()
  @IsRfc('personType', {
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
