import {
  CommonFilterDto,
  CreateProductDto,
  filterCommonQuery,
  GenerateProductPdfDto,
  ProductRepository,
  tobase64,
  UpdateProductDto,
} from '@ivt/a-state';
import { createCollectionResponse, IvtCollectionResponse, Product } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

import { generateProductPdf, getProductPdfTemplate } from './products.service.constants';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

  async getProductById(id: number): Promise<Product> {
    const query = this.productRepository.createQueryBuilder('product');
    const found = await query.where('product.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create({
      ...createProductDto,
    });
    await newProduct.save();
    return newProduct;
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productRepository.save(updateProductDto);
    return updatedProduct;
  }

  async getProducts(filterDto: CommonFilterDto): Promise<IvtCollectionResponse<Product>> {
    const { text, pageSize, pageIndex } = filterDto;
    const query = this.productRepository.createQueryBuilder('product').groupBy('product.id');

    if (text) {
      query.andWhere('LOWER(product.name) LIKE :text', { text: `%${text.toLowerCase()}%` });
    }

    filterCommonQuery('product', query, filterDto);

    const products = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(products, pageSize, pageIndex, total);
  }

  async generateProductPdf(generateProductPdfDto: GenerateProductPdfDto, response: Response): Promise<void> {
    const template = generateProductPdfDto.template;
    let headerLogo;

    if (generateProductPdfDto.logo != null) {
      headerLogo = generateProductPdfDto.logo;
    } else {
      headerLogo = await tobase64('apps/innovatech-api/src/assets/img/forte-shield.png');
      headerLogo = 'data:image/png;base64,' + headerLogo;
    }
    const content = getProductPdfTemplate(template);

    await generateProductPdf(content, headerLogo, response);
  }
}
