import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdditionalProduct } from '@valmira/domain';

import { CreateAdditionalProductDto } from '../dto/create-additional-product.dto';
import { GetAdditionalProductsDto } from '../dto/get-additional-products.dto';
import { UpdateAdditionalProductDto } from '../dto/update-additional-product.dto';
import { AdditionalProductsService } from '../services/additional-products.service';

@Controller('additional-products')
export class AdditionalProductsController {
  constructor(private additionalProductsService: AdditionalProductsService) {}

  @Get()
  async getAdditionalProducts(
    @Query() filterDto: GetAdditionalProductsDto,
  ): Promise<ApsCollectionResponse<AdditionalProduct>> {
    return this.additionalProductsService.getAdditionalProducts(filterDto);
  }

  @Get(':id')
  async getAdditionalProduct(@Param('id', ParseIntPipe) id: number): Promise<AdditionalProduct> {
    return this.additionalProductsService.getAdditionalProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createAdditionalProduct(
    @Body() createAdditionalProductDto: CreateAdditionalProductDto,
  ): Promise<AdditionalProduct> {
    return this.additionalProductsService.createAdditionalProduct(createAdditionalProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateAdditionalProduct(
    @Body() updateAdditionalProductDto: UpdateAdditionalProductDto,
  ): Promise<AdditionalProduct> {
    return this.additionalProductsService.updateAdditionalProduct(updateAdditionalProductDto);
  }
}
