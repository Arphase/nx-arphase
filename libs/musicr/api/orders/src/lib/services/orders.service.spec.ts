import { createMockRepository } from '@arphase/api/testing';
import {
  AdditionalOptionEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PriceOptionEntity,
  ProductEntity,
} from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(OrderEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(ProductEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(PriceOptionEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(AdditionalOptionEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(OrderProductEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(OrderProductAdditionalOptionEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
