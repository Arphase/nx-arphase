import { Reservation } from '@valmira/domain';
import { DeepPartial } from 'typeorm';

export function getReservationTotal(reservation: DeepPartial<Reservation>): {
  placeTotal: number;
  productTotal: number;
  total: number;
} {
  const { pricePerNight, promocode, nights, additionalProducts } = reservation;
  const placeTotal = pricePerNight * nights;
  let productTotal = 0;
  let total = pricePerNight * nights;
  if (promocode) {
    total -= promocode.amount;
  }
  if (additionalProducts) {
    productTotal = additionalProducts.reduce((sum, { amount, price }) => sum + Number(amount) * Number(price), 0);
  }
  total += productTotal;
  return { placeTotal, productTotal, total };
}
