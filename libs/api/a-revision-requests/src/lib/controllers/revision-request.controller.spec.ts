import { Test, TestingModule } from '@nestjs/testing';

import { RevisionRequestService } from '../services/revision-request.service';
import { RevisionRequestController } from './revision-request.controller';

describe('RevisionRequestController', () => {
  let controller: RevisionRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionRequestController],
      providers: [{ provide: RevisionRequestService, useValue: {} }],
    }).compile();

    controller = module.get<RevisionRequestController>(RevisionRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
