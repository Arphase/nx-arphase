import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMoralPersonDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  businessName: string;

  @IsOptional()
  @IsDateString()
  constitutionDate: Date;

  @IsOptional()
  @IsString()
  distributor: string;

  @IsOptional()
  @IsString()
  adviser: string;
}
