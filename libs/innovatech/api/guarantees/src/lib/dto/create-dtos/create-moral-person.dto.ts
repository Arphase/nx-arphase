import { Trim } from '@arphase/api/core';
import { IsDate, IsDateString, IsString } from 'class-validator';

export class CreateMoralPersonDto {
  @IsString()
  @Trim('businessName')
  businessName: string;

  @IsDate()
  constitutionDate: Date;

  @IsString()
  @Trim('adviser')
  adviser: string;
}
