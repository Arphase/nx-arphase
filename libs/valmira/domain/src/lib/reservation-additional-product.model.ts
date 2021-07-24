import { AdditionalProduct } from './additional-product.model';
import { Reservation } from './reservation.model';

export interface ReservationAdditionalProduct {
  id?: number;
  total: number;
  additionalProductId: number;
  additionalProduct: AdditionalProduct;
  reservationId: number;
  reservation: Reservation;
}
