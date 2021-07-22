import { LocalityEntity, TypeOrmUnitTestModule } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalitiesService } from './localities.service';

describe('LocalitiesService', () => {
  let service: LocalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([LocalityEntity])],
      providers: [LocalitiesService],
    }).compile();

    service = module.get<LocalitiesService>(LocalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
