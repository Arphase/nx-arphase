import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: { getProducts: jest.fn() } }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should call the get products service', () => {
    const mockDto = {};

    controller.getProducts(mockDto);

    expect(service.getProducts).toHaveBeenCalledWith(mockDto);
  });
});
