import { getDateRangeArray } from '@arphase/common';
import { Reservation } from '@valmira/domain';
import dayjs from 'dayjs';

export function getOccupiedDates(reservations: Partial<Reservation>[]): Date[] {
  let dates = [];
  reservations.forEach(reservation => {
    const { startDate, endDate } = reservation;
    dates = [...dates, ...getDateRangeArray(startDate, dayjs(endDate).subtract(1, 'day').toDate())];
  });
  return dates;
}
