import { Test, TestingModule } from '@nestjs/testing';

import { SubcategoriesService } from '../services/subcategories.service';
import { SubcategoriesController } from './subcategories.controller';

describe('SubcategoriesController', () => {
  let controller: SubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [{ provide: SubcategoriesService, useValue: {} }],
    }).compile();

    controller = module.get<SubcategoriesController>(SubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
