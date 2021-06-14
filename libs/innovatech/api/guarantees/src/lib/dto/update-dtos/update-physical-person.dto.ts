import { Trim } from '@arphase/api';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePhysicalPersonDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @Trim()
  lastName: string;

  @IsOptional()
  @IsString()
  @Trim()
  secondLastName: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date;
}
