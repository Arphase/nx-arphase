import { Test, TestingModule } from '@nestjs/testing';
import { RevisionRequestService } from './revision-request.service';

describe('RevisionRequestService', () => {
  let service: RevisionRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevisionRequestService],
    }).compile();

    service = module.get<RevisionRequestService>(RevisionRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
