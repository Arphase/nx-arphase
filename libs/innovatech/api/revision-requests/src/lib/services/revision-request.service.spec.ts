import { createMockRepository } from '@arphase/api/testing';
import { RevisionRequestEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RevisionRequestService } from './revision-request.service';

describe('RevisionRequestService', () => {
  let service: RevisionRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionRequestService,
        { provide: getRepositoryToken(RevisionRequestEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<RevisionRequestService>(RevisionRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
