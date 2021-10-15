import { getDateRangeArray } from '@arphase/common';
import { Reservation } from '@valmira/domain';
import dayjs from 'dayjs';

export function getOccupiedDates(reservations: Partial<Reservation>[], dateType: string): Date[] {
  let dates = [];
  reservations.forEach(reservation => {
    let { startDate, endDate } = reservation;
    startDate = dateType === 'endDate' ? dayjs(startDate).add(1, 'day').toDate() : startDate;
    endDate = dateType === 'startDate' ? dayjs(endDate).subtract(1, 'day').toDate() : endDate;
    dates = [...dates, ...getDateRangeArray(startDate, endDate)];
  });
  return dates;
}
