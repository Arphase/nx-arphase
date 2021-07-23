import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { SubcategoryEntity } from '@musicr/api/domain';
import { Subcategory } from '@musicr/domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(@InjectRepository(SubcategoryEntity) private subcategoryRepository: Repository<SubcategoryEntity>) {}

  async getSubcategories(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Subcategory>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .orderBy('subcategory.name', SortDirection.ascend);

    filterCollectionQuery('subcategory', query, filterDto);

    const subcategories = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Subcategory>(subcategories, pageSize, pageIndex, total);
  }

  async createSubcategory(subcategory: CreateSubcategoryDto): Promise<Subcategory> {
    const found = await this.subcategoryRepository.findOne(subcategory);
    if (found) {
      return found;
    }
    try {
      const newSubcategory = this.subcategoryRepository.create({ ...subcategory });
      return this.subcategoryRepository.save(newSubcategory);
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`La categoría con id ${subcategory.categoryId} no existe`);
      }
    }
  }

  async deleteSubcategory(id: number): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({ id });

    if (!subcategory) {
      throw new NotFoundException(`Categoría con id ${id} no existe`);
    }

    if (subcategory?.products?.length) {
      throw new BadRequestException(`La subcategoría no puede ser eliminada porque tiene productos asignadas`);
    }

    await this.subcategoryRepository.delete({ id });

    return subcategory;
  }
}
