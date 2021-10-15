import { Reservation } from '@valmira/domain';

import { getOccupiedDates } from './occupied-dates';

describe('OccupiedDates', () => {
  describe('startDate', () => {
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
        new Date('2021-08-02T05:42:28Z'),
        new Date('2021-08-03T05:42:28Z'),
        new Date('2021-08-07T05:42:28Z'),
        new Date('2021-08-08T05:42:28Z'),
        new Date('2021-08-09T05:42:28Z'),
        new Date('2021-08-10T05:42:28Z'),
        new Date('2021-08-15T05:42:28Z'),
        new Date('2021-08-16T05:42:28Z'),
        new Date('2021-08-17T05:42:28Z'),
      ];

      expect(getOccupiedDates(reservations, 'startDate')).toEqual(expected);
    });
  });
  describe('endDate', () => {
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
        new Date('2021-08-03T05:42:28Z'),
        new Date('2021-08-04T05:42:28Z'),
        new Date('2021-08-08T05:42:28Z'),
        new Date('2021-08-09T05:42:28Z'),
        new Date('2021-08-10T05:42:28Z'),
        new Date('2021-08-11T05:42:28Z'),
        new Date('2021-08-16T05:42:28Z'),
        new Date('2021-08-17T05:42:28Z'),
        new Date('2021-08-18T05:42:28Z'),
      ];

      expect(getOccupiedDates(reservations, 'endDate')).toEqual(expected);
    });
  });
});
