import { Reservation } from '@valmira/domain';

import { getOccupiedDates } from './occupied-dates';

describe('OccupiedDates', () => {
  it('should get the occupied dates of one or more reservations', () => {
    const reservations: Partial<Reservation>[] = [
      {
        startDate: new Date('2021-08-02T22:42:28Z'),
        endDate: new Date('2021-08-04T22:42:28Z'),
      },
      {
        startDate: new Date('2021-08-07T22:42:28Z'),
        endDate: new Date('2021-08-11T22:42:28Z'),
      },
      {
        startDate: new Date('2021-08-15T22:42:28Z'),
        endDate: new Date('2021-08-18T22:42:28Z'),
      },
    ];
    const expected: Date[] = [
      new Date('2021-08-02T22:42:28Z'),
      new Date('2021-08-03T22:42:28Z'),
      new Date('2021-08-07T22:42:28Z'),
      new Date('2021-08-08T22:42:28Z'),
      new Date('2021-08-09T22:42:28Z'),
      new Date('2021-08-10T22:42:28Z'),
      new Date('2021-08-15T22:42:28Z'),
      new Date('2021-08-16T22:42:28Z'),
      new Date('2021-08-17T22:42:28Z'),
    ];

    expect(getOccupiedDates(reservations)).toEqual(expected);
  });
});
