import { IsNumber } from 'class-validator';

export class ExportPdfDto {
  @IsNumber()
  utcOffset: number;
}
