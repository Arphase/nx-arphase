import { Trim } from '@arphase/api';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMoralPersonDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Trim()
  businessName: string;

  @IsOptional()
  @IsDateString()
  constitutionDate: Date;

  @IsOptional()
  @IsString()
  @Trim()
  adviser: string;
}
