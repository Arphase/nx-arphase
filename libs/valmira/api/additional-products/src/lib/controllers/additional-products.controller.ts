import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AdditionalProduct } from '@valmira/domain';

import { CreateAdditionalProductDto } from '../dto/create-additional-product.dto';
import { UpdateAdditionalProductDto } from '../dto/update-additional-product.dto';
import { AdditionalProductsService } from '../services/additional-products.service';

@Controller('additional-products')
export class AdditionalProductsController {
  constructor(private additionalProductsService: AdditionalProductsService) {}

  @Get()
  async getProducts(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<AdditionalProduct>> {
    return this.additionalProductsService.getAdditionalProducts(filterDto);
  }

  @Get(':id')
  async getAdditionalProduct(@Param('id', ParseIntPipe) id: number): Promise<AdditionalProduct> {
    return this.additionalProductsService.getAdditionalProduct(id);
  }

  @Post()
  async createAdditionalProduct(
    @Body() createAdditionalProductDto: CreateAdditionalProductDto
  ): Promise<AdditionalProduct> {
    return this.additionalProductsService.createAdditionalProduct(createAdditionalProductDto);
  }

  @Put(':id')
  async updateAdditionalProduct(
    @Body() updateAdditionalProductDto: UpdateAdditionalProductDto
  ): Promise<AdditionalProduct> {
    return this.additionalProductsService.updateAdditionalProduct(updateAdditionalProductDto);
  }
}
