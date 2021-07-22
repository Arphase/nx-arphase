import { Trim } from '@arphase/api';
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
