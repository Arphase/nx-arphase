import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({ name: 'redDay' })
export class RedDayPipe implements PipeTransform {
  transform(value: Date, occupiedDates: string[]): unknown {
    const date = dayjs(value);
    return occupiedDates.find(occupeiedDate => date.isSame(occupeiedDate, 'day'));
  }
}
