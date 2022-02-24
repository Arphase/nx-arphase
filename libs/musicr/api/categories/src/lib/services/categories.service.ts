import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { CategoryEntity } from '@musicr/api/domain';
import { Category } from '@musicr/domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

  async getCategories(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Category>> {
    const { pageIndex, pageSize, text } = filterDto;
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategories')
      .orderBy('category.name', SortDirection.ascend);

    if (text) {
      query.andWhere(`(LOWER(category.name) like :text)`, { text: `%${text.toLowerCase()}%` });
    }

    filterCollectionQuery('category', query, filterDto);

    const categories = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Category>(categories, pageSize, pageIndex, total);
  }

  async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const found = await this.categoryRepository.findOne(category);
    if (found) {
      return found;
    }
    const newCategory = this.categoryRepository.create({ ...category });
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategory(updateCategoryDto.id);
    return this.categoryRepository.save({ ...category, ...updateCategoryDto });
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no existe`);
    }

    if (category?.subcategories?.length) {
      throw new BadRequestException(`La categoría no puede ser eliminada porque tiene subcategorías asignadas`);
    }

    await this.categoryRepository.softDelete({ id });

    return category;
  }
}
