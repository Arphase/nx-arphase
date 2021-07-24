import { createMockRepository } from '@arphase/api/testing';
import { GuaranteeEntity, PaymentOrderEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersService', () => {
  let service: PaymentOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentOrdersService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(PaymentOrderEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(GuaranteeEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<PaymentOrdersService>(PaymentOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
