import { Test, TestingModule } from '@nestjs/testing';

import { PromocodesService } from '../services/promocodes.service';
import { PromocodesController } from './promocodes.controller';

describe('PromocodesController', () => {
  let controller: PromocodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromocodesController],
      providers: [{ provide: PromocodesService, useValue: {} }],
    }).compile();

    controller = module.get<PromocodesController>(PromocodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
