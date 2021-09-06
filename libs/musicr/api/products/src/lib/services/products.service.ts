import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { ProductEntity } from '@musicr/api/domain';
import { Product } from '@musicr/domain';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqBy } from 'lodash';
import { Repository } from 'typeorm';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async getProducts(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .orderBy('product.createdAt', SortDirection.descend);

    filterCollectionQuery('product', query, filterDto);

    const products = await query.leftJoinAndSelect('product.photos', 'photos').getMany();
    const total = await query.getCount();
    return createCollectionResponse<Product>(products, pageSize, pageIndex, total);
  }

  async getProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create({ ...product });
      return this.productRepository.save(newProduct);
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

  async updateProduct(updateDto: UpdateProductDto): Promise<Product> {
    const preloadedProduct = await this.productRepository.preload(updateDto);
    await preloadedProduct.save();
    preloadedProduct.reload();
    preloadedProduct.photos = uniqBy(preloadedProduct.photos, 'id');
    return preloadedProduct;
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProduct(id);
    try {
      await this.productRepository.remove(product);
      return product;
    } catch (e) {
      if (e.code === '23503') {
        throw new ConflictException(
          'No se puede eliminar el promocode porque existen reservaciones con este promocode'
        );
      }
    }
  }
}
