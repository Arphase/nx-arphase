import {
  CommonFilterDto,
  CompanyRepository,
  CreateProductDto,
  filterCommonQuery,
  GenerateProductPdfDto,
  GroupRepository,
  ProductRepository,
  tobase64,
  UpdateProductDto,
} from '@ivt/a-state';
import { Company, createCollectionResponse, IvtCollectionResponse, Product, User, UserRoles } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

import { generateProductPdf, getProductPdfTemplate } from './products.service.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository) private productRepository: ProductRepository,
    @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository
  ) {}

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

  async getProducts(filterDto: CommonFilterDto, user: Partial<User>): Promise<IvtCollectionResponse<Product>> {
    const { text, pageSize, pageIndex, groupId } = filterDto;
    const query = this.productRepository.createQueryBuilder('product').groupBy('product.id');

    if (text) {
      query.andWhere('LOWER(product.name) LIKE :text', { text: `%${text.toLowerCase()}%` });
    }

    filterCommonQuery('product', query, filterDto);

    if ((user && UserRoles[user.role] !== UserRoles.superAdmin) || groupId) {
      let company: Company;
      if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
        company = await this.companyRepository.findOne({ id: user.companyId });
      }
      const group = await this.groupRepository
        .createQueryBuilder('group')
        .leftJoinAndSelect('group.products', 'products')
        .andWhere('group.id = :id', { id: company?.groupId || groupId })
        .getOne();
      const products = group?.products || [];
      const total = products.length;
      return createCollectionResponse(products, pageSize, pageIndex, total);
    } else {
      const products = await query.getMany();
      const total = await query.getCount();
      return createCollectionResponse(products, pageSize, pageIndex, total);
    }
  }

  async generateProductPdf(generateProductPdfDto: GenerateProductPdfDto, response: Response): Promise<void> {
    const template = generateProductPdfDto.template;
    let headerLogo;

    if (generateProductPdfDto.logo) {
      headerLogo = generateProductPdfDto.logo;
    } else {
      headerLogo = await tobase64('apps/innovatech-api/src/assets/img/forte-shield.png');
      headerLogo = 'data:image/png;base64,' + headerLogo;
    }
    const content = getProductPdfTemplate(template);

    await generateProductPdf(content, headerLogo, response);
  }
}
