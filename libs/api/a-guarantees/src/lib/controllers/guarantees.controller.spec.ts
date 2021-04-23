import { Test, TestingModule } from '@nestjs/testing';

import { GuaranteesService } from '../services/guarantees.service';
import { GuaranteesController } from './guarantees.controller';

describe('GuaranteesController', () => {
  let controller: GuaranteesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuaranteesController],
      providers: [{ provide: GuaranteesService, useValue: {} }],
    }).compile();

    controller = module.get<GuaranteesController>(GuaranteesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
