import { ProductComponentRepository, ProductRepository } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { ProductComponentsService } from './product-components.service';

describe('ProductComponentsService', () => {
  let service: ProductComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductComponentsService,
        { provide: ProductRepository, useValue: {} },
        { provide: ProductComponentRepository, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<ProductComponentsService>(ProductComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
