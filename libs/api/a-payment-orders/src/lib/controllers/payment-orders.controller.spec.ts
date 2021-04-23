import { Test, TestingModule } from '@nestjs/testing';

import { PaymentOrdersService } from '../services/payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';

describe('PaymentOrders Controller', () => {
  let controller: PaymentOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOrdersController],
      providers: [{ provide: PaymentOrdersService, useValue: {} }],
    }).compile();

    controller = module.get<PaymentOrdersController>(PaymentOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
