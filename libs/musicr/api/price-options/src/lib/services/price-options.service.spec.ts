import { createMockRepository } from '@arphase/api/testing';
import { PriceOptionEntity } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PriceOptionsService } from './price-options.service';

describe('PriceOptionsService', () => {
  let service: PriceOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceOptionsService,
        { provide: getRepositoryToken(PriceOptionEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<PriceOptionsService>(PriceOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
