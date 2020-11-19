import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GenerateProductPdfDto {

  @IsNotEmpty()
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  logo: string;

}
