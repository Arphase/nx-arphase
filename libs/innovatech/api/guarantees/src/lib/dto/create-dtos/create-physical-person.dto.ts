import { Trim } from '@arphase/api/core';
import { IsDateString, IsString } from 'class-validator';

export class CreatePhysicalPersonDto {
  @IsString()
  @Trim()
  name: string;

  @IsString()
  @Trim()
  lastName: string;

  @IsString()
  @Trim()
  secondLastName: string;

  @IsDateString()
  birthDate: Date;
}
