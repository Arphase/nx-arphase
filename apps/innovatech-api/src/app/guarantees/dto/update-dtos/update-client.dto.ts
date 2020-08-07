import { PersonTypes, PhysicalPerson, MoralPerson } from '@ivt/data';
import { Address } from 'cluster';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsEmail,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from './update-address.dto';
import { UpdatePhysicalPersonDto } from './update-physical-person.dto';
import { UpdateMoralPersonDto } from './update-moral-person.dto';
import { IsRfc } from '../custom-validators';

export class UpdateClientDto {
  @IsOptional()
  @IsEnum(PersonTypes)
  personType: PersonTypes;

  @IsOptional()
  @ValidateIf((client) => client.personType === PersonTypes.physical)
  @ValidateNested()
  @Type(() => UpdatePhysicalPersonDto)
  physicalInfo: PhysicalPerson;

  @IsOptional()
  @ValidateIf((client) => client.personType === PersonTypes.moral)
  @ValidateNested()
  @Type(() => UpdateMoralPersonDto)
  moralInfo: MoralPerson;

  @IsOptional()
  @IsString()
  @IsRfc('personType', {
    message: 'rfc must have the format of the person type',
  })
  rfc: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: Address;

  @IsOptional()
  salesPlace: string;
}
