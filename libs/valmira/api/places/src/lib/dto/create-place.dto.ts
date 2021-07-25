import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  area: number;

  @IsNumber()
  weeklyPrice: number;

  @IsNumber()
  weekendPrice: number;

  @IsNumber()
  rooms: number;

  @IsNumber()
  beds: number;

  @IsNumber()
  categoryId: number;

  @IsString({ each: true })
  services: string[];
}
