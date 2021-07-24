import { ReservationAdditionalProduct } from './reservation-additional-product.model';

export interface AdditionalProduct {
  id?: number;
  name: string;
  price: number;
  reservationAdditionalProducts?: ReservationAdditionalProduct[];
}
