import { CompanyRepository } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService, { provide: CompanyRepository, useValue: {} }],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
