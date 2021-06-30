import { ApsCollectionFilterDto } from '@arphase/api';
import { ApsCollectionResponse } from '@arphase/common';
import { Product } from '@musicr/domain';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    return this.productsService.getProducts(filterDto);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }
}
