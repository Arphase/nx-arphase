import { IsNumber, IsString } from 'class-validator';

export class GetReservationDetailDto {
  @IsNumber()
  id: number;

  @IsString()
  email: string;
}
