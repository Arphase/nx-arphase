import { Test, TestingModule } from '@nestjs/testing';

import { PriceOptionsService } from '../services/price-options.service';
import { PriceOptionsController } from './price-options.controller';

describe('PriceOptionsController', () => {
  let controller: PriceOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceOptionsController],
      providers: [{ provide: PriceOptionsService, useValue: {} }],
    }).compile();

    controller = module.get<PriceOptionsController>(PriceOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
