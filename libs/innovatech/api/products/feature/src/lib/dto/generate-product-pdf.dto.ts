import { IsOptional, IsString } from 'class-validator';

export class GenerateProductPdfDto {
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  logo: string;
}
