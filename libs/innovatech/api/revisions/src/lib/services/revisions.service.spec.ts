import { RevisionEntity, TypeOrmUnitTestModule, VehicleEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RevisionsService } from './revisions.service';

describe('RevisionsService', () => {
  let service: RevisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([RevisionEntity, VehicleEntity])],
      providers: [RevisionsService, { provide: Connection, useValue: {} }],
    }).compile();

    service = module.get<RevisionsService>(RevisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
