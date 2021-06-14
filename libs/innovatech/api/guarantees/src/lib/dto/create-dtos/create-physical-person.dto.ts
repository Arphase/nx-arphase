import { Trim } from '@arphase/api';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePhysicalPersonDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  secondLastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;
}
