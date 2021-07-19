import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignPhotoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
