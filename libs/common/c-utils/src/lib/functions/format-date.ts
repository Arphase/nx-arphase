import dayjs from 'dayjs';

export function formatDate(date: Date): string {
  return date ? dayjs(date).format('DD/MM/YY') : '';
}
