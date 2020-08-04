import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreatePhysicalPersonDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsNotEmpty()
  @IsDate()
  birthDate: Date;
}
