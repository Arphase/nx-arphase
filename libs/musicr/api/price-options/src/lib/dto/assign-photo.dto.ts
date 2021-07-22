import { IsNumber } from 'class-validator';

export class AssignPhotoDto {
  @IsNumber()
  id: number;

  @IsNumber()
  order: number;
}
