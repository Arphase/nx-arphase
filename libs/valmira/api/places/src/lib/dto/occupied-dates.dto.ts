import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import dayjs from 'dayjs';

export class OccupiedDatesDto {
  @IsOptional()
  @Transform(({ obj }) => dayjs(obj['startDate']).set('hour', 15).set('minute', 0).set('second', 0).toDate())
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Transform(({ obj }) => dayjs(obj['endDate']).set('hour', 11).set('minute', 0).set('second', 0).toDate())
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  dateType?: string;
}
