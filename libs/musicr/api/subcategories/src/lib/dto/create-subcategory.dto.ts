import { IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;
}
