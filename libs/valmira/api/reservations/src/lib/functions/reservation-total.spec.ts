import { DeepPartial } from '@arphase/common';
import { Reservation } from '@valmira/domain';

import { getReservationTotal } from './reservation-total';

describe('GetReservationTotal', () => {
  it('should return 5000 if 2 nights of 2500 are reserved', () => {
    const reservation: DeepPartial<Reservation> = {
      nights: 2,
      pricePerNight: 2500,
    };

    expect(getReservationTotal(reservation as Reservation).total).toEqual(5000);
  });

  it('should return 5500 if 3 nights of 2000 were reserved and a promocode of 500 is applied', () => {
    const reservation: DeepPartial<Reservation> = {
      nights: 3,
      pricePerNight: 2000,
      promocode: { amount: 500 },
    };
    expect(getReservationTotal(reservation as Reservation).total).toEqual(5500);
  });

  it('should return 10000 if 3 nights of 2500 were reserved, a promocode of 500 is applied, and 3 additional products of 1000 were purchased', () => {
    const reservation: DeepPartial<Reservation> = {
      nights: 3,
      pricePerNight: 2500,
      promocode: { amount: 500 },
      additionalProducts: [
        {
          amount: 3,
          additionalProduct: {
            price: 1000,
          },
        },
      ],
    };
    expect(getReservationTotal(reservation as Reservation).total).toEqual(10000);
  });
});
