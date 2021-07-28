import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@valmira/api/domain';
import { Category } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

  async getCategories(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Category>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.categoryRepository.createQueryBuilder('category').orderBy('category.name', SortDirection.ascend);

    filterCollectionQuery('category', query, filterDto);

    const categories = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Category>(categories, pageSize, pageIndex, total);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }
}
