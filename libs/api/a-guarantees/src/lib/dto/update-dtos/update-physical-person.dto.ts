import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdatePhysicalPersonDto{
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  secondLastName: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date;
}
