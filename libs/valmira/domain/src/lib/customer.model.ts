import { Reservation } from './reservation.model';

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reservations?: Reservation[];
}
