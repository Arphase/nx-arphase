import { DeepPartial, getDateRangeArray } from '@arphase/common';
import { Reservation } from '@valmira/domain';
import dayjs from 'dayjs';

/**
 * Gets price per night and total of nights of a reservation
 * To check if date is week day or weekend day we use this rule
 * Day of Week (Sunday as 0, Saturday as 6)
 * See more at: https://day.js.org/docs/en/get-set/get
 * @param reservation
 * @returns reservation days info
 */
export function getReservationDaysInfo(reservation: DeepPartial<Reservation>): {
  days;
  nights;
  pricePerNight;
} {
  const { startDate, endDate, place } = reservation;
  const days = getDateRangeArray(startDate as Date, endDate as Date);
  const nights = days.slice(0, days.length - 1);
  let weekDays = 0;
  let weekendDays = 0;
  const weekendDayNumber = [0, 5, 6];
  nights.forEach(day => (weekendDayNumber.includes(dayjs(day).get('d')) ? weekendDays++ : weekDays++));
  return {
    days: days.length,
    nights: nights.length,
    pricePerNight: (weekendDays * place.weekendPrice + weekDays * place.weeklyPrice) / nights.length,
  };
}
