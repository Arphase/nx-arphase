import { createMockRepository } from '@arphase/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';
import { Reservation } from '@valmira/domain';
import { endOfDay, startOfDay } from 'date-fns';

import { PlacesService } from './places.service';

function condition(reservation: Partial<Reservation>, newReservation: Partial<Reservation>) {
  const { startDate, endDate } = newReservation;
  const startDate1 = endOfDay(new Date(startDate));
  const endDate1 = startOfDay(new Date(endDate));
  const startDate2 = endOfDay(new Date(startDate));
  const endDate2 = startOfDay(new Date(endDate));
  const condition1 = reservation.startDate.getTime() >= startDate1.getTime();
  const condition2 = reservation.startDate.getTime() <= endDate1.getTime();
  const condition3 = reservation.endDate.getTime() >= startDate2.getTime();
  const condition4 = reservation.endDate.getTime() <= endDate2.getTime();
  const condition5 = reservation.startDate.getTime() === startDate.getTime();
  const condition6 = reservation.startDate.getTime() === startDate.getTime();
  return (condition1 && condition2) || (condition3 && condition4) || condition5 || condition6;
}

describe('PlacesService', () => {
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        { provide: getRepositoryToken(PlaceEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(ReservationEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return a reservation if trying to reserve in the same days', () => {
    const exsitingReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    const newReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    expect(condition(exsitingReservation, newReservation)).toBeTruthy();
  });

  it('should return a reservation if reservation overlaps with startDate', () => {
    const exsitingReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    const newReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-25T15:00:00Z'),
      endDate: new Date('2021-10-27T11:00:00Z'),
    };

    expect(condition(exsitingReservation, newReservation)).toBeTruthy();
  });

  it('should return a reservation if reservation overlaps with endDate', () => {
    const exsitingReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    const newReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-27:00:00Z'),
      endDate: new Date('2021-10-29T11:00:00Z'),
    };

    expect(condition(exsitingReservation, newReservation)).toBeTruthy();
  });

  it('should not return a reservation if endDate of existing is same as startDate of new reservation', () => {
    const exsitingReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    const newReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-28T15:00:00Z'),
      endDate: new Date('2021-10-30T11:00:00Z'),
    };

    expect(condition(exsitingReservation, newReservation)).toBeFalsy();
  });

  it('should not return a reservation if startDate of existing is same as endDate of new reservation', () => {
    const exsitingReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-26T15:00:00Z'),
      endDate: new Date('2021-10-28T11:00:00Z'),
    };

    const newReservation: Partial<Reservation> = {
      startDate: new Date('2021-10-24T15:00:00Z'),
      endDate: new Date('2021-10-26T11:00:00Z'),
    };

    expect(condition(exsitingReservation, newReservation)).toBeFalsy();
  });
});
