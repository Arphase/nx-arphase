import { createMockRepository } from '@arphase/api/testing';
import { AdditionalOptionEntity } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AdditionalOptionsService } from './additional-options.service';

describe('AdditionalOptionsService', () => {
  let service: AdditionalOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdditionalOptionsService,
        { provide: getRepositoryToken(AdditionalOptionEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<AdditionalOptionsService>(AdditionalOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
