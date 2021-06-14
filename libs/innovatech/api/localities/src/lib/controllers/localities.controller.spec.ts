import { Test, TestingModule } from '@nestjs/testing';

import { LocalitiesService } from '../services/localities.service';
import { LocalitiesController } from './localities.controller';

describe('Localities Controller', () => {
  let controller: LocalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalitiesController],
      providers: [{ provide: LocalitiesService, useValue: {} }],
    }).compile();

    controller = module.get<LocalitiesController>(LocalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
