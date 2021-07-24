import { Reservation } from './reservation.model';

export interface Promocode {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  reservations?: Reservation[];
}
