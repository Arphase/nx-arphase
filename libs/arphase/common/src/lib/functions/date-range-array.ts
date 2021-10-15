import dayjs from 'dayjs';

export function getDateRangeArray(startDate: Date, endDate: Date): Date[] {
  const dates = [];
  const endDateEndOfDay = dayjs(endDate).set('hour', 23).set('minute', 59).set('second', 59).toDate();
  let currentDate = startDate;
  while (currentDate <= endDateEndOfDay) {
    dates.push(currentDate);
    currentDate = dayjs(currentDate).add(1, 'day').toDate();
  }
  return dates;
}
