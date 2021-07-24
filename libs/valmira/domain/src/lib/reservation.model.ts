import { Customer } from './customer.model';
import { Place } from './place.model';
import { Promocode } from './promocode.model';

export interface Reservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  total: number;
  paymentId?: string;
  placeId: number;
  place: Place;
  customerId: number;
  customer: Customer;
  promocodeId?: number;
  promocode?: Promocode;
}

export enum ReservationStatus {
  created = 1,
  paid = 2,
  cancelled = 3,
}
