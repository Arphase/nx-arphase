import { createMockRepository } from '@arphase/api/testing';
import { GuaranteeEntity, MoralPersonEntity, PhysicalPersonEntity, VehicleEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { GuaranteesService } from './guarantees.service';

describe('GuaranteesService', () => {
  let service: GuaranteesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuaranteesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(GuaranteeEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(PhysicalPersonEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(MoralPersonEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(VehicleEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<GuaranteesService>(GuaranteesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
