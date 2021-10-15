import dayjs from 'dayjs';

export function getDateRangeArray(startDate: Date, endDate: Date): Date[] {
  const dates = [];
  let currentDate = dayjs(startDate).set('hour', 0).toDate();
  while (currentDate <= endDate) {
    currentDate = dayjs(currentDate).set('hour', 0).toDate();
    dates.push(currentDate);
    currentDate = dayjs(currentDate).add(1, 'day').toDate();
  }
  return dates;
}
