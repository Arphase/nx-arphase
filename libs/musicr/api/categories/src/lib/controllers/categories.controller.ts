import { ApsCollectionFilterDto, ApsGetItemQueryDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { OrderCategoriesDto } from '../dto/order-categories.dto';
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
  async getCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() itemQueryDto: ApsGetItemQueryDto,
  ): Promise<Category> {
    return this.categoriesService.getCategory(id, itemQueryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/order')
  async orderCategories(@Body() orderCategoriesDto: OrderCategoriesDto): Promise<Category[]> {
    return this.categoriesService.orderCategories(orderCategoriesDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deteteCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
