import { Trim } from '@arphase/api/core';
import { IsDateString, IsString } from 'class-validator';

export class CreatePhysicalPersonDto {
  @IsString()
  @Trim('name')
  name: string;

  @IsString()
  @Trim('lastName')
  lastName: string;

  @IsString()
  @Trim('secondLastName')
  secondLastName: string;

  @IsDateString()
  birthDate: Date;
}
