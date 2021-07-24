import { createMockRepository } from '@arphase/api/testing';
import { RevisionEntity, VehicleEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RevisionsService } from './revisions.service';

describe('RevisionsService', () => {
  let service: RevisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionsService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(RevisionEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(VehicleEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<RevisionsService>(RevisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
