import { ProductRepository, ProductEntity } from '@ivt/a-state';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateProductDto } from '../dto/create-products.dto';

@Injectable()
export class ProductService {
  productRepository: ProductRepository;

  constructor(private readonly connection: Connection) {
    this.productRepository = this.connection.getCustomRepository(ProductRepository);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = await this.productRepository.create({
      ...createProductDto,
    });
    await newProduct.save();
    return newProduct;
  }

}
