import {
  GuaranteeEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  TypeOrmUnitTestModule,
  VehicleEntity,
} from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { GuaranteesService } from './guarantees.service';

describe('GuaranteesService', () => {
  let service: GuaranteesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmUnitTestModule,
        TypeOrmModule.forFeature([GuaranteeEntity, PhysicalPersonEntity, MoralPersonEntity, VehicleEntity]),
      ],
      providers: [GuaranteesService, { provide: Connection, useValue: {} }],
    }).compile();

    service = module.get<GuaranteesService>(GuaranteesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
