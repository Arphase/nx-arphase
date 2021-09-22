import { AdditionalProduct } from './additional-product.model';
import { Reservation } from './reservation.model';

export interface ReservationAdditionalProduct {
  id?: number;
  active?: boolean;
  amount: number;
  price: number;
  additionalProductId: number;
  additionalProduct: AdditionalProduct;
  reservationId: number;
  reservation: Reservation;
  destroy?: boolean;
}
