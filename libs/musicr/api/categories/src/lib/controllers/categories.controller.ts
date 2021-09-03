import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
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

  @Put(':id')
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }

  @Delete(':id')
  async deteteCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
