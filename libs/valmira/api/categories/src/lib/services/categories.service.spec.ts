import { createMockRepository } from '@arphase/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '@valmira/api/domain';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, { provide: getRepositoryToken(CategoryEntity), useValue: createMockRepository() }],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
