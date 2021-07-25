import { createMockRepository } from '@arphase/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdditionalProductEntity } from '@valmira/api/domain';

import { AdditionalProductsService } from './additional-products.service';

describe('AdditionalProductsService', () => {
  let service: AdditionalProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdditionalProductsService,
        { provide: getRepositoryToken(AdditionalProductEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<AdditionalProductsService>(AdditionalProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
