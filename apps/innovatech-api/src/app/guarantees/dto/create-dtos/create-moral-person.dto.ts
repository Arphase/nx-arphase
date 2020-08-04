import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateMoralPersonDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsDate()
  constitutionDate: Date;

  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsString()
  adviser: string;
}
