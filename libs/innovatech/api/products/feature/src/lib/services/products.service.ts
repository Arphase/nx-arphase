import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { filterCommonQuery, tobase64 } from '@innovatech/api/core/util';
import { CompanyEntity, GroupEntity, ProductEntity } from '@innovatech/api/domain';
import { generateProductPdf, getProductPdfTemplate } from '@innovatech/api/products/utils';
import { Company, Product, User, UserRoles } from '@innovatech/common/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Response } from 'express';
import { BaseEntity, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateProductDto } from '../dto/create-products.dto';
import { GenerateProductPdfDto } from '../dto/generate-product-pdf.dto';
import { GetProductsDto } from '../dto/get-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @InjectRepository(CompanyEntity) private companyRepository: Repository<CompanyEntity>,
    @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>
  ) {}

  async getProducts(filterDto: GetProductsDto, user: Partial<User>): Promise<ApsCollectionResponse<Product>> {
    const { text, pageSize, pageIndex, groupId, year, horsePower } = filterDto;
    const query = this.productRepository.createQueryBuilder('product').addSelect('product.logo').groupBy('product.id');
    if (text) {
      query.andWhere('(LOWER(product.name) LIKE :text)', { text: `%${text.toLowerCase()}%` });
    }
    filterCommonQuery('product', query, filterDto);

    if ((user && UserRoles[user.role] !== UserRoles.superAdmin) || groupId) {
      let company: Company;
      if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
        company = await this.companyRepository.findOne({ id: user.companyId });
      }
      const groupQuery = this.groupRepository
        .createQueryBuilder('group')
        .leftJoinAndSelect('group.products', 'product')
        .andWhere('group.id = :id', { id: company?.groupId || groupId });
      if (groupId) {
        groupQuery.addSelect('product.logo');
      }
      this.filterYearAndHp(groupQuery, year, horsePower);
      const group = await groupQuery.getOne();
      const products = group?.products || [];
      const total = products.length;
      return createCollectionResponse(products, pageSize, pageIndex, total);
    } else {
      this.filterYearAndHp(query, year, horsePower);
      const products = await query.getMany();
      const total = await query.getCount();
      return createCollectionResponse(products, pageSize, pageIndex, total);
    }
  }

  filterYearAndHp(query: SelectQueryBuilder<BaseEntity>, year: number, horsePower: number): void {
    if (year && horsePower) {
      const todayYear = Number(dayjs().format('YYYY'));
      const productYear = todayYear - year;
      query
        .andWhere(`product.minYear <= :productYear and product.maxYear >= :productYear`, { productYear })
        .andWhere(`product.minHp <= :horsePower and product.maxHp >= :horsePower`, { horsePower });
    }
  }

  async getProductById(id: number): Promise<Product> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .addSelect('product.logo')
      .addSelect('product.template');
    const found = await query.where('product.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productRepository.save(updateProductDto);
  }

  async generateProductPdf(generateProductPdfDto: GenerateProductPdfDto, response: Response): Promise<void> {
    const template = generateProductPdfDto.template;
    let headerLogo;

    if (generateProductPdfDto.logo) {
      headerLogo = generateProductPdfDto.logo;
    } else {
      headerLogo = await tobase64('apps/innovatech/api/src/assets/img/forte-shield.png');
      headerLogo = `data:image/png;base64,${headerLogo}`;
    }
    const content = getProductPdfTemplate(template);

    await generateProductPdf(content, headerLogo, response);
  }
}
