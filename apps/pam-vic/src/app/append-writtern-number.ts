import dayjs from 'dayjs';

export function run(): void {
  calculateTime();
  setInterval(() => calculateTime(), 60000);
}

function calculateTime(): void {
  const today = dayjs();
  const nextDay = dayjs().endOf('day');
  const nextHour = dayjs().endOf('hour');
  const weddingDay = dayjs(new Date(2021, 9, 23));
  const days = weddingDay.diff(today, 'day');
  const hours = nextDay.diff(today, 'hour');
  const minutes = nextHour.diff(today, 'minute');
  document.querySelector('#countdown').innerHTML = `${days} días, ${hours} horas, ${minutes} minutos.`;
}

run();
