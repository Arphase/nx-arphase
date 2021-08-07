import { DeepPartial } from '@arphase/common';
import { Reservation } from '@valmira/domain';
import dayjs from 'dayjs';

/**
 * Gets price per night of a reservation
 * To check if date is week day or weekend day we use this rule
 * Day of Week (Sunday as 0, Saturday as 6)
 * See more at: https://day.js.org/docs/en/get-set/get
 * @param reservation
 * @returns price per night
 */
export function getPricePerNight(reservation: DeepPartial<Reservation>): number {
  const days = getDates(reservation.startDate as Date, reservation.endDate as Date);
  let weekDays = 0;
  let weekendDays = 0;
  const weekendDayNumber = [0, 5, 6];
  days.forEach(day => (weekendDayNumber.includes(dayjs(day).get('d')) ? weekendDays++ : weekDays++));
  return (weekendDays * reservation.place.weekendPrice + weekDays * reservation.place.weeklyPrice) / days.length;
}

function getDates(startDate: Date, endDate: Date): Date[] {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}
