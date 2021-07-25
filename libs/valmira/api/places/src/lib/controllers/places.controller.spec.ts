import { Test, TestingModule } from '@nestjs/testing';

import { PlacesService } from '../services/places.service';
import { PlacesController } from './places.controller';

describe('PlacesController', () => {
  let controller: PlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [{ provide: PlacesService, useValue: {} }],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
