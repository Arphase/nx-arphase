import { Trim } from '@arphase/api/core';
import { IsDate, IsString } from 'class-validator';

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

  @IsDate()
  birthDate: Date;
}
