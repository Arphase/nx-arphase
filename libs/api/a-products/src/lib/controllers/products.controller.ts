import { GetUser } from '@ivt/a-auth';
import { CreateProductDto, GenerateProductPdfDto, GetProductsDto, UpdateProductDto } from '@ivt/a-state';
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
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetProductsDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Product>> {
    return this.productService.getProducts(filterDto, user);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post('')
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(updateProductDto);
  }

  @Post('preview/pdf')
  async getGuaranteePdf(
    @Body() generateProductPdfDto: GenerateProductPdfDto,
    @Res() response: Response
  ): Promise<void> {
    return this.productService.generateProductPdf(generateProductPdfDto, response);
  }
}
