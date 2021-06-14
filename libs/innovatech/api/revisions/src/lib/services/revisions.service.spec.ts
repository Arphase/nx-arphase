import { RevisionRepository, VehicleRepository } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { RevisionsService } from './revisions.service';

describe('RevisionsService', () => {
  let service: RevisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionsService,
        { provide: RevisionRepository, useValue: {} },
        { provide: VehicleRepository, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<RevisionsService>(RevisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
