import { PriceOptionRepository } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { PriceOptionsService } from './price-options.service';

describe('PriceOptionsService', () => {
  let service: PriceOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceOptionsService, { provide: PriceOptionRepository, useValue: {} }],
    }).compile();

    service = module.get<PriceOptionsService>(PriceOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});