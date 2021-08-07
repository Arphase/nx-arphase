import { createMockRepository } from '@arphase/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdditionalProductEntity, PlaceEntity, PromocodeEntity, ReservationEntity } from '@valmira/api/domain';

import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        { provide: getRepositoryToken(ReservationEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(PlaceEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(PromocodeEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(AdditionalProductEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
