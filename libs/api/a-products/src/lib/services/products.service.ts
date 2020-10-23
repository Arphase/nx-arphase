import { ProductRepository, ProductEntity } from '@ivt/a-state';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateProductDto } from '../dto/create-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '@ivt/c-data';

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

}
