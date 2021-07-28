import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Category } from '@valmira/domain';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Category>> {
    return this.categoriesService.getCategories(filterDto);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
