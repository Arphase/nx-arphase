import { ApsGetItemQueryDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Subcategory } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { GetSubcategoriesDto } from '../dto/get-subcategories.dto';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';
import { SubcategoriesService } from '../services/subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @Get()
  async getSubcategories(@Query() filterDto: GetSubcategoriesDto): Promise<ApsCollectionResponse<Subcategory>> {
    return this.subcategoriesService.getSubcategories(filterDto);
  }

  @Get(':id')
  async getSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryDto: ApsGetItemQueryDto
  ): Promise<Subcategory> {
    return this.subcategoriesService.getSubCategory(id, queryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSubcategory(@Body() createCategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    return this.subcategoriesService.createSubcategory(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateSubcategory(@Body() updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    return this.subcategoriesService.updateSubcategory(updateSubcategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteSubcategory(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return this.subcategoriesService.deleteSubcategory(id);
  }
}
