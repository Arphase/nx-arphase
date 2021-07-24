import { createMockRepository } from '@arphase/api/testing';
import { CompanyEntity, GroupEntity, ProductEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(ProductEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(CompanyEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(GroupEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
