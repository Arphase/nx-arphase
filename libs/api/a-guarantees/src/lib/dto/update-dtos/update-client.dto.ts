import { MoralPerson, PersonTypes, PhysicalPerson } from '@ivt/c-data';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Address } from 'cluster';

import { IsRfc } from '@ivt/c-utils';
import { UpdateAddressDto } from './update-address.dto';
import { UpdateMoralPersonDto } from './update-moral-person.dto';
import { UpdatePhysicalPersonDto } from './update-physical-person.dto';

export class UpdateClientDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Transform(value => PersonTypes[value])
  @IsEnum(PersonTypes)
  personType: PersonTypes;

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
