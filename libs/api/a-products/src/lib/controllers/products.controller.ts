import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProductDto } from '../dto/create-products.dto';
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

}
