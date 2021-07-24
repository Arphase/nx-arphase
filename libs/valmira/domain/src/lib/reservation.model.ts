import { Customer } from './customer.model';
import { Place } from './place.model';
import { Promocode } from './promocode.model';
import { ReservationAdditionalProduct } from './reservation-additional-product.model';

export interface Reservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus | string;
  total: number;
  paymentId?: string;
  placeId: number;
  place: Place;
  customer: Customer;
  promocodeId?: number;
  promocode?: Promocode;
  reservationAdditionalProducts?: ReservationAdditionalProduct[];
}

export enum ReservationStatus {
  created = 1,
  paid = 2,
  cancelled = 3,
}
