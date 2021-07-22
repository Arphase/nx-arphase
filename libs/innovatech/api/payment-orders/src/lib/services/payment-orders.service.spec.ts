import { GuaranteeEntity, PaymentOrderEntity, TypeOrmUnitTestModule } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersService', () => {
  let service: PaymentOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([PaymentOrderEntity, GuaranteeEntity])],
      providers: [PaymentOrdersService, { provide: Connection, useValue: {} }],
    }).compile();

    service = module.get<PaymentOrdersService>(PaymentOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
