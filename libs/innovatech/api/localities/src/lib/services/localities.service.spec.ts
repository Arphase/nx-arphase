import { createMockRepository } from '@arphase/api/testing';
import { LocalityEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LocalitiesService } from './localities.service';

describe('LocalitiesService', () => {
  let service: LocalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalitiesService, { provide: getRepositoryToken(LocalityEntity), useValue: createMockRepository() }],
    }).compile();

    service = module.get<LocalitiesService>(LocalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
