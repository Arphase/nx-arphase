import { createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { PriceOptionEntity, ProductEntity } from '@musicr/api/domain';
import { PriceOption, Product } from '@musicr/domain';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit, orderBy } from 'lodash';
import { Repository } from 'typeorm';

import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceOptionEntity)
    private priceOptionRepository: Repository<PriceOptionEntity>,
  ) {}

  /**
   * Here we sorted the photo ids manually because of a bug
   * with orderBy relations and pagination.
   * @param filterDto
   * @returns products
   */
  async getProducts(filterDto: GetProductsFilterDto): Promise<ApsCollectionResponse<Product>> {
    const { pageIndex, pageSize, categoryId, subcategoryId, text } = filterDto;
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoinAndSelect('product.photos', 'photos')
      .orderBy('product.createdAt', SortDirection.descend);

    filterCollectionQuery('product', query, filterDto);

    if (categoryId) {
      query.andWhere(`(category.id = :categoryId)`, { categoryId });
    }

    if (subcategoryId) {
      query.andWhere(`(subcategory.id = :subcategoryId)`, { subcategoryId });
    }

    if (text) {
      query.andWhere(
        `(LOWER(product.name) like :text OR
          LOWER(category.name) like :text OR
          LOWER(subcategory.name) like :text
      )`,
        { text: `%${text.toLowerCase()}%` },
      );
    }

    const products = await query.getMany();
    const sortedProducts = products.map(product => ({
      ...product,
      photos: orderBy(product.photos, ['id'], ['desc']),
    }));
    const total = await query.getCount();
    return createCollectionResponse<Product>(sortedProducts, pageSize, pageIndex, total);
  }

  async getProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(omit(product, 'priceOptions'));
      await this.productRepository.save(newProduct);
      await this.savePriceOptions(product.priceOptions, newProduct.id);
      return newProduct;
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`La subcategoría con id ${product.subcategoryId} no existe`);
      }
      if (e.code === '23505') {
        throw new ConflictException(
          `Un producto con el nombre ${product.name} y la subcategoría con id ${product.subcategoryId} ya existe`,
        );
      }
    }
  }

  async updateProduct(updateDto: UpdateProductDto): Promise<Product> {
    await this.getProduct(updateDto.id);
    await this.savePriceOptions(updateDto.priceOptions, updateDto.id);
    return this.productRepository.create({ ...omit(updateDto, 'priceOptions') }).save();
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProduct(id);
    try {
      await this.productRepository.softRemove(product);
      return product;
    } catch (e) {
      if (e.code === '23503') {
        throw new ConflictException('No se puede eliminar el producto porque existe en alguna orden');
      }
    }
  }

  async savePriceOptions(priceOptions: PriceOption[], productId: number): Promise<void> {
    await Promise.all(
      priceOptions.map(async priceOption => {
        const newPriceOption = this.priceOptionRepository.create({ ...priceOption, productId });
        await newPriceOption.save();
      }),
    );
  }
}
