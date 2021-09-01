import { DeepPartial } from '@arphase/common';
import { Reservation } from '@valmira/domain';

import { getReservationDaysInfo } from './reservation-days-info';

describe('ReservationDaysInfo', () => {
  it('should return 1000 if 4 week nights at 1000 is reserved', () => {
    const reservation: DeepPartial<Reservation> = {
      startDate: new Date('2021-08-02T22:42:28Z'),
      endDate: new Date('2021-08-06T22:42:28Z'),
      place: { weeklyPrice: 1000, weekendPrice: 0 },
    };

    expect(getReservationDaysInfo(reservation)).toEqual({ pricePerNight: 1000, nights: 4, days: 5 });
  });

  it('should return 2000 if 3 week nights at 2000 is reserved', () => {
    const reservation: DeepPartial<Reservation> = {
      startDate: new Date('2021-08-06T22:42:28Z'),
      endDate: new Date('2021-08-09T22:42:28Z'),
      place: { weeklyPrice: 1000, weekendPrice: 2000 },
    };

    expect(getReservationDaysInfo(reservation)).toEqual({ pricePerNight: 2000, nights: 3, days: 4 });
  });

  it('should return 2000 if a week of 1000 weekday and 2000 weekend is reserved', () => {
    const reservation: DeepPartial<Reservation> = {
      startDate: new Date('2021-08-01T22:42:28Z'),
      endDate: new Date('2021-08-08T22:42:28Z'),
      place: { weeklyPrice: 1000, weekendPrice: 2000 },
    };

    expect(getReservationDaysInfo(reservation)).toEqual({ pricePerNight: 1428.5714285714287, nights: 7, days: 8 });
  });
});
