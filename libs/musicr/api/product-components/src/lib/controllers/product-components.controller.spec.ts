import { Test, TestingModule } from '@nestjs/testing';

import { ProductComponentsService } from '../services/product-components.service';
import { ProductComponentsController } from './product-components.controller';

describe('ProductComponentsController', () => {
  let controller: ProductComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductComponentsController],
      providers: [{ provide: ProductComponentsService, useValue: {} }],
    }).compile();

    controller = module.get<ProductComponentsController>(ProductComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
