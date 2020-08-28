import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateMoralPersonDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsDateString()
  constitutionDate: Date;

  @IsNotEmpty()
  @IsString()
  adviser: string;
}
