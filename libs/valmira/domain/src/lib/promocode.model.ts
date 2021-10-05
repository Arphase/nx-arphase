import { Reservation } from './reservation.model';

export interface Promocode {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  amount: number;
  reservations?: Reservation[];
}
