import { AdditionalOptionEntity, TypeOrmUnitTestModule } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdditionalOptionsService } from './additional-options.service';

describe('AdditionalOptionsService', () => {
  let service: AdditionalOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([AdditionalOptionEntity])],
      providers: [AdditionalOptionsService],
    }).compile();

    service = module.get<AdditionalOptionsService>(AdditionalOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
