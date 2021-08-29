import dayjs from 'dayjs';
import * as writtenNumber from 'written-number';

writtenNumber.defaults.lang = 'es';

export function run(): void {
  const today = dayjs();
  const weddingDay = dayjs(new Date(2021, 9, 23));
  const remainingDays = weddingDay.diff(today, 'day');
  const remainingDaysString = writtenNumber(remainingDays);
  document.querySelector('#countdown').innerHTML = remainingDaysString;
}

run();
