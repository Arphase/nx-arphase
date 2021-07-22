import { RevisionRequestEntity, TypeOrmUnitTestModule } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionRequestService } from './revision-request.service';

describe('RevisionRequestService', () => {
  let service: RevisionRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([RevisionRequestEntity])],
      providers: [RevisionRequestService],
    }).compile();

    service = module.get<RevisionRequestService>(RevisionRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
