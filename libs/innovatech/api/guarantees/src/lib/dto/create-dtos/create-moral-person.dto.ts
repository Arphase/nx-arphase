import { Trim } from '@arphase/api/core';
import { IsDateString, IsString } from 'class-validator';

export class CreateMoralPersonDto {
  @IsString()
  @Trim()
  businessName: string;

  @IsDateString()
  constitutionDate: Date;

  @IsString()
  @Trim()
  adviser: string;
}
