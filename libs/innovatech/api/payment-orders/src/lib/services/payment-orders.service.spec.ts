import { GuaranteeRepository, PaymentOrderRepository } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersService', () => {
  let service: PaymentOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentOrdersService,
        { provide: PaymentOrderRepository, useValue: {} },
        { provide: GuaranteeRepository, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<PaymentOrdersService>(PaymentOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
