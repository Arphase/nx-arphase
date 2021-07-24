import { createMockRepository } from '@arphase/api/testing';
import { SubcategoryEntity } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoriesService,
        { provide: getRepositoryToken(SubcategoryEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
