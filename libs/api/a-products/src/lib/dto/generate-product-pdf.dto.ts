import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GenerateProductPdfDto {

  @IsNotEmpty()
  @IsString()
  template: string;

}
