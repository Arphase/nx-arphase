import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@valmira/api/domain';
import { Category } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }
}
