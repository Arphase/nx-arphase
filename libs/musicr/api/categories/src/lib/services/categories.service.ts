import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { CategoryEntity } from '@musicr/api/domain';
import { Category } from '@musicr/domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const found = await this.categoryRepository.findOne(category);
    if (found) {
      return found;
    }
    const newCategory = this.categoryRepository.create({ ...category });
    return this.categoryRepository.save(newCategory);
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no existe`);
    }

    if (category?.subcategories?.length) {
      throw new BadRequestException(`La categoría no puede ser eliminada porque tiene subcategorías asignadas`);
    }

    await this.categoryRepository.delete({ id });

    return category;
  }
}
