import { Customer } from './customer.model';
import { Place } from './place.model';
import { Promocode } from './promocode.model';
import { ReservationAdditionalProduct } from './reservation-additional-product.model';

export interface Reservation {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  startDate: Date;
  endDate: Date;
  status?: ReservationStatus | string;
  total?: number;
  additionalComments?: string;
  paymentId?: string;
  placeId: number;
  place?: Place;
  customerId?: number;
  customer?: Customer;
  promocodeId?: number;
  promocode?: Promocode;
  pricePerNight?: number;
  placeTotal?: number;
  productTotal?: number;
  nights?: number;
  days?: number;
  discount?: number;
  additionalProducts?: ReservationAdditionalProduct[];
}

export enum ReservationStatus {
  created = 1,
  paid = 2,
  cancelled = 3,
}
