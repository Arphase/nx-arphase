import { Body, Controller, Get, Put, Param, ParseIntPipe, Post, Res, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProductDto } from '../dto/create-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { GetProductsFilterDto} from '../dto/get-products-filter.dto'
import { ProductService } from '../services/products.service';
import { Product } from '@ivt/c-data';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('')
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(updateProductDto);
  }

  @Get()
  async getGuarantees(@Query(ValidationPipe) filterDto: GetProductsFilterDto): Promise<Product[]> {
    return this.productService.getProducts(filterDto);
  }

}
