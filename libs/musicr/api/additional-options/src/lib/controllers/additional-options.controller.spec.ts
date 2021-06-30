import { Test, TestingModule } from '@nestjs/testing';

import { AdditionalOptionsService } from '../services/additional-options.service';
import { AdditionalOptionsController } from './additional-options.controller';

describe('AdditionalOptionsController', () => {
  let controller: AdditionalOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalOptionsController],
      providers: [{ provide: AdditionalOptionsService, useValue: {} }],
    }).compile();

    controller = module.get<AdditionalOptionsController>(AdditionalOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
