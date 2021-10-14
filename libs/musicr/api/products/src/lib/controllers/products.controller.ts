import { ApsCollectionResponse } from '@arphase/common';
import { Product } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() filterDto: GetProductsFilterDto): Promise<ApsCollectionResponse<Product>> {
    return this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
