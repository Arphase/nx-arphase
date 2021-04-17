import { GetUser } from '@ivt/a-auth';
import { CommonFilterDto, CreateProductDto, GenerateProductPdfDto, UpdateProductDto } from '@ivt/a-state';
import { IvtCollectionResponse, Product, User } from '@ivt/c-data';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { ProductService } from '../services/products.service';

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
  async getProducts(
    @Query(ValidationPipe) filterDto: CommonFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Product>> {
    return this.productService.getProducts(filterDto, user);
  }

  @Post('preview/pdf')
  async getGuaranteePdf(
    @Body() generateProductPdfDto: GenerateProductPdfDto,
    @Res() response: Response
  ): Promise<void> {
    return this.productService.generateProductPdf(generateProductPdfDto, response);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }
}
