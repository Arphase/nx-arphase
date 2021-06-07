import { CompanyRepository, GroupRepository, ProductRepository } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useValue: {} },
        { provide: CompanyRepository, useValue: {} },
        { provide: GroupRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
