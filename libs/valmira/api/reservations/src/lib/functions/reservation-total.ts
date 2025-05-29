import { Reservation } from '@valmira/domain';

export function getReservationTotal(reservation: Reservation): {
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
    productTotal = additionalProducts.reduce(
      (sum, { amount, additionalProduct }) => sum + Number(amount) * Number(additionalProduct.price),
      0,
    );
  }
  total += productTotal;
  return { placeTotal, productTotal, total };
}
