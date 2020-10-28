import { ProductRepository, ProductEntity } from '@ivt/a-state';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateProductDto } from '../dto/create-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '@ivt/c-data';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';

@Injectable()
export class ProductService {
  productRepository: ProductRepository;

  constructor(private readonly connection: Connection) {
    this.productRepository = this.connection.getCustomRepository(ProductRepository);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create({
      ...createProductDto,
    });
    await newProduct.save();
    return newProduct;
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    const  updatedProduct = await this.productRepository.save(updateProductDto);
    return updatedProduct;
  }

  async getProducts(filterDto: Partial<GetProductsFilterDto>): Promise<Product[]> {
    const { limit, offset, sort, price, name } = filterDto;
    const query = this.productRepository.createQueryBuilder('products');

    if(sort && price) {
      query.orderBy(`${sort}`, price);
    }

    if (name) {
      query.andWhere('LOWER(products.name) like :name', { name: `%${name.toLowerCase()}%` });
    }

    query.groupBy('products.id').take(limit).skip(offset);

    const products = await query.getMany();

    return products;
  }

}
