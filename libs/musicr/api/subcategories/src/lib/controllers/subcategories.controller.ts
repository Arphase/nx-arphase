import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Subcategory } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';
import { SubcategoriesService } from '../services/subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @Get()
  async getSubcategories(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Subcategory>> {
    return this.subcategoriesService.getSubcategories(filterDto);
  }

  @Get(':id')
  async getSubCategory(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return this.subcategoriesService.getSubCategory(id);
  }

  @Post()
  async createSubcategory(@Body() createCategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    return this.subcategoriesService.createSubcategory(createCategoryDto);
  }

  @Put(':id')
  async updateSubcategory(@Body() updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    return this.subcategoriesService.updateSubcategory(updateSubcategoryDto);
  }

  @Delete(':id')
  async deleteSubcategory(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return this.subcategoriesService.deleteSubcategory(id);
  }
}
