import { Address, MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { UpdateAddressDto } from '../../../addresses/dto/update-address.dto';
import { IsRfc } from '../../../validators';
import { UpdateMoralPersonDto } from './update-moral-person.dto';
import { UpdatePhysicalPersonDto } from './update-physical-person.dto';

export class UpdateClientDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Transform(({ obj, key }) => PersonTypes[obj[key]])
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
  @IsRfc(RfcValidatorTypes.any, {
    message: 'RFC has incorrect format',
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
