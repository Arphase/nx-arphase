import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMoralPersonDto {
  @IsOptional()
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
