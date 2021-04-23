import { Test, TestingModule } from '@nestjs/testing';

import { RevisionsService } from '../services/revisions.service';
import { RevisionsController } from './revisions.controller';

describe('RevisionsController', () => {
  let controller: RevisionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionsController],
      providers: [{ provide: RevisionsService, useValue: {} }],
    }).compile();

    controller = module.get<RevisionsController>(RevisionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
