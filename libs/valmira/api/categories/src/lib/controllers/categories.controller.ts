import { Body, Controller, Post } from '@nestjs/common';
import { Category } from '@valmira/domain';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
