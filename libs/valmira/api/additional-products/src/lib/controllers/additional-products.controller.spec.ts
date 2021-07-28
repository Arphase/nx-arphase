import { Test, TestingModule } from '@nestjs/testing';

import { AdditionalProductsService } from '../services/additional-products.service';
import { AdditionalProductsController } from './additional-products.controller';

describe('AdditionalProductsController', () => {
  let controller: AdditionalProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalProductsController],
      providers: [{ provide: AdditionalProductsService, useValue: {} }],
    }).compile();

    controller = module.get<AdditionalProductsController>(AdditionalProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
