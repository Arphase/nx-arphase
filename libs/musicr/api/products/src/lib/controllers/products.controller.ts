import { ApsCollectionFilterDto } from '@arphase/api';
import { ApsCollectionResponse } from '@arphase/common';
import { Product } from '@musicr/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    return this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(updateProductDto);
  }
}
