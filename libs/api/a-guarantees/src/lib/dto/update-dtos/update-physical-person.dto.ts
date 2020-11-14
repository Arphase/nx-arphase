import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhysicalPersonDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

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
