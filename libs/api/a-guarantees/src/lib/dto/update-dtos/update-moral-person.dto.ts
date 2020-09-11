import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMoralPersonDto {
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
