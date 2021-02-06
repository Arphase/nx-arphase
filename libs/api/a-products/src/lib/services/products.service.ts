import {
  CreateProductDto,
  GenerateProductPdfDto,
  GetProductsFilterDto,
  getReadableStream,
  OUT_FILE,
  ProductRepository,
  tobase64,
  UpdateProductDto,
} from '@ivt/a-state';
import { Product } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

import { getProductPdfTemplate } from './products.service.constants';

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

  async getProducts(filterDto: Partial<GetProductsFilterDto>): Promise<Product[]> {
    const { limit, offset, sort, price, name } = filterDto;
    const query = this.productRepository.createQueryBuilder('products');

    if (sort && price) {
      query.orderBy(`${sort}`, price);
    }

    if (name) {
      query.andWhere('LOWER(products.name) LIKE :name', { name: `%${name.toLowerCase()}%` });
    }

    query.groupBy('products.id').take(limit).skip(offset);

    const products = await query.getMany();

    return products;
  }

  async generateProductPdf(generateProductPdfDto: GenerateProductPdfDto, response: Response): Promise<void> {
    const template = generateProductPdfDto.template;

    let logo;

    if (generateProductPdfDto.logo != null) {
      logo = generateProductPdfDto.logo;
    } else {
      logo = await tobase64('apps/innovatech-api/src/assets/img/EscudoForte.png');
      logo = 'data:image/png;base64,' + logo;
    }

    const content = getProductPdfTemplate(template);
    const headerImg = await tobase64(`apps/innovatech-api/src/assets/img/logo.png`);
    const headerLogo = logo;
    const footerImg = await tobase64('apps/innovatech-api/src/assets/img/Franja_Tringulo.jpg');

    await promisify(fs.writeFile)(OUT_FILE, content);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });

    await page.addStyleTag({
      content: `
          body { margin-top: 1cm; }
          @page:first { margin-top: 0; }
      `,
    });
    const buffer = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: {
        left: '1in',
        top: '1in',
        right: '1in',
        bottom: '2in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
      <style>
        .logo {
          max-width: 15%;
          height: auto;
          margin: 0.3in 0 0 0.8in;
        }
        .shield {
          max-width: 10%;
          height: auto;
          margin: 0.1in 0.18in 0 auto;
        }
        #header { padding: 0 !important; }
      </style>
      <img class="logo"
      src="data:image/png;base64,${headerImg}"/>
      <img class="shield"
          src="${headerLogo}"/>`,
      footerTemplate: `
      <style>
        .footer {
          width: 100%;
          height: 1in;
        }
        #footer { padding: 0 !important; }
      </style>
      <img class="footer"
          src="data:image/jpg;base64,${footerImg}"/>
      `,
    });
    promisify(fs.unlink)(OUT_FILE);
    await browser.close();
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }
}
