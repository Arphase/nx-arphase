import { SubcategoryEntity, TypeOrmUnitTestModule } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([SubcategoryEntity])],
      providers: [SubcategoriesService],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
