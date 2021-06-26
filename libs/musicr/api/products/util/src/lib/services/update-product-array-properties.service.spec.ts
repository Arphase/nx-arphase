import { ProductRepository } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { UpdateProductArrayPropertiesService } from './update-product-array-properties.service';

describe('UpdateProductArrayPropertiesService', () => {
  let service: UpdateProductArrayPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductArrayPropertiesService,
        { provide: ProductRepository, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<UpdateProductArrayPropertiesService>(UpdateProductArrayPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
