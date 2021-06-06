import { LocalityRepository } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { LocalitiesService } from './localities.service';

describe('LocalitiesService', () => {
  let service: LocalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalitiesService, { provide: LocalityRepository, useValue: {} }],
    }).compile();

    service = module.get<LocalitiesService>(LocalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
