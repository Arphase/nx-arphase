import { ApsCollectionResponse } from '@arphase/common';
import { GetUser } from '@innovatech/api/auth/data';
import { Product, User } from '@innovatech/common/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { CreateProductDto } from '../dto/create-products.dto';
import { GenerateProductPdfDto } from '../dto/generate-product-pdf.dto';
import { GetProductsDto } from '../dto/get-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../services/products.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(
    @Query() filterDto: GetProductsDto,
    @GetUser() user: Partial<User>,
  ): Promise<ApsCollectionResponse<Product>> {
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
    @Res() response: Response,
  ): Promise<void> {
    return this.productService.generateProductPdf(generateProductPdfDto, response);
  }
}
