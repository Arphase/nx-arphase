import { Reservation } from '@valmira/domain';
import { DeepPartial } from 'typeorm';

export function getReservationTotal(reservation: DeepPartial<Reservation>): number {
  const { pricePerNight, promocode, nights, additionalProducts } = reservation;
  let total = pricePerNight * nights;
  if (promocode) {
    total -= promocode.amount;
  }
  if (additionalProducts) {
    additionalProducts.forEach(product => (total += product.amount * product.additionalProduct.price));
  }
  return total;
}
