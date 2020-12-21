import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateProductPdfDto {
  @IsNotEmpty()
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  logo: string;
}
