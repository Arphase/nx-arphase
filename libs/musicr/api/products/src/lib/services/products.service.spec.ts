import { createMockRepository } from '@arphase/api/testing';
import { ProductEntity } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, { provide: getRepositoryToken(ProductEntity), useValue: createMockRepository() }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });
});
