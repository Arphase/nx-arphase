import { AdditionalProduct } from './additional-product.model';
import { Reservation } from './reservation.model';

export interface ReservationAdditionalProduct {
  id?: number;
  amount: number;
  price: number;
  additionalProductId: number;
  additionalProduct: AdditionalProduct;
  reservationId: number;
  reservation: Reservation;
}
