import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { CategoryRepository } from '@musicr/api/domain';
import { Category } from '@musicr/domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {}

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
    await newCategory.save();

    return newCategory;
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