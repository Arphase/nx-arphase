import { AdditionalOptionRepository } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { AdditionalOptionsService } from './additional-options.service';

describe('AdditionalOptionsService', () => {
  let service: AdditionalOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalOptionsService, { provide: AdditionalOptionRepository, useValue: {} }],
    }).compile();

    service = module.get<AdditionalOptionsService>(AdditionalOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
