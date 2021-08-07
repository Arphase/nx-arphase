import { IsDate } from 'class-validator';

export class OccupiedDatesDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
