import { Trim } from '@arphase/api';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMoralPersonDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  businessName: string;

  @IsNotEmpty()
  @IsDateString()
  constitutionDate: Date;

  @IsNotEmpty()
  @IsString()
  @Trim()
  adviser: string;
}
