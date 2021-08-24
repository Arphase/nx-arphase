import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Category>> {
    return this.categoriesService.getCategories(filterDto);
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Delete(':id')
  async deteteCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
