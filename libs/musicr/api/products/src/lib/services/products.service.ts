import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { ProductRepository } from '@musicr/api/domain';
import { Product } from '@musicr/domain';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

  async getProducts(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.createdAt', SortDirection.descend);

    filterCollectionQuery('product', query, filterDto);

    const products = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Product>(products, pageSize, pageIndex, total);
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create({ ...product });
      await newProduct.save();
      return newProduct;
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`La subcategoría con id ${product.subcategoryId} no existe`);
      }
      if (e.code === '23505') {
        throw new ConflictException(
          `Un producto con el nombre ${product.name} y la subcategoría con id ${product.subcategoryId} ya existe`
        );
      }
    }
  }
}
