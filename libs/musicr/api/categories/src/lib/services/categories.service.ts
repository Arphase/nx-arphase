import {
  ApsCollectionFilterDto,
  ApsGetItemQueryDto,
  createCollectionResponse,
  filterCollectionQuery,
} from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { CategoryEntity } from '@musicr/api/domain';
import { Category } from '@musicr/domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderBy } from 'lodash';
import { DataSource, In, Repository } from 'typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { OrderCategoriesDto } from '../dto/order-categories.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private dataSource: DataSource
  ) {}

  async getCategories(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Category>> {
    const { pageIndex, pageSize, text } = filterDto;
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategories')
      .leftJoinAndSelect('category.photo', 'photo')
      .orderBy('category.name', SortDirection.ascend);

    if (text) {
      query.andWhere(`(LOWER(category.name) like :text)`, { text: `%${text.toLowerCase()}%` });
    }

    filterCollectionQuery('category', query, filterDto);

    const categories = await query.getMany();
    const sortedCategories = categories.map(category => ({
      ...category,
      subcategories: orderBy(category.subcategories, ['position'], ['asc']),
    }));
    const total = await query.getCount();
    return createCollectionResponse<Category>(sortedCategories, pageSize, pageIndex, total);
  }

  async getCategory(id: number, filterDto: ApsGetItemQueryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: filterDto.relations ?? ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const sortedCategory: Category = {
      ...category,
      subcategories: orderBy(category.subcategories, ['position'], ['asc']),
    };
    return sortedCategory;
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const found = await this.categoryRepository.findOneBy({ name: category.name });
    if (found) {
      return found;
    }
    const newCategory = this.categoryRepository.create({ ...category });
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategory(updateCategoryDto.id, { relations: [] });
    return this.categoryRepository.save({ ...category, ...updateCategoryDto });
  }

  async orderCategories(orderCategoriesDto: OrderCategoriesDto): Promise<Category[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        orderCategoriesDto.categories.map(async category => {
          const categoryEntity = this.categoryRepository.create(category);
          await queryRunner.manager.save(categoryEntity);
        })
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return this.categoryRepository.findBy({ id: In(orderCategoriesDto.categories.map(({ id }) => id)) });
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no existe`);
    }

    if (category?.subcategories?.length) {
      throw new BadRequestException(`La categoría no puede ser eliminada porque tiene subcategorías asignadas`);
    }

    await this.categoryRepository.softRemove({ id });

    return category;
  }
}
