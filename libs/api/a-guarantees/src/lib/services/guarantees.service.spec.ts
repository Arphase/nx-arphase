import { GuaranteeRepository, MoralPersonRepository, PhysicalPersonRepository, VehicleRepository } from '@ivt/a-state';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { GuaranteesService } from './guarantees.service';

describe('GuaranteesService', () => {
  let service: GuaranteesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuaranteesService,
        { provide: GuaranteeRepository, useValue: {} },
        { provide: PhysicalPersonRepository, useValue: {} },
        { provide: MoralPersonRepository, useValue: {} },
        { provide: VehicleRepository, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<GuaranteesService>(GuaranteesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
