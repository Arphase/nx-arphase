import moment from 'moment';

export function formatDate(date: Date): string {
  return date ? moment(date).format('DD/MM/YYYY') : '';
}
