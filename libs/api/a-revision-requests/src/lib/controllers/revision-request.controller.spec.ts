import { Test, TestingModule } from '@nestjs/testing';
import { RevisionRequestController } from './revision-request.controller';

describe('RevisionRequestController', () => {
  let controller: RevisionRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionRequestController],
    }).compile();

    controller = module.get<RevisionRequestController>(RevisionRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
