import { createMockRepository } from '@arphase/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PromocodeEntity } from '@valmira/api/domain';

import { PromocodesService } from './promocodes.service';

describe('PromocodesService', () => {
  let service: PromocodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromocodesService,
        { provide: getRepositoryToken(PromocodeEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<PromocodesService>(PromocodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
