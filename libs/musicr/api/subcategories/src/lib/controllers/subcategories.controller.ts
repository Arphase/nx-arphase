import { ApsCollectionFilterDto } from '@arphase/api';
import { ApsCollectionResponse } from '@arphase/common';
import { Subcategory } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { SubcategoriesService } from '../services/subcategories.service';

@Controller('subcategories')
@UseGuards(AuthGuard('jwt'))
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @Get()
  async getSubcategories(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Subcategory>> {
    return this.subcategoriesService.getSubcategories(filterDto);
  }

  @Post()
  async createSubcategory(@Body() createCategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    return this.subcategoriesService.createSubcategory(createCategoryDto);
  }

  @Delete(':id')
  async deleteSubcategory(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return this.subcategoriesService.deleteSubcategory(id);
  }
}
