import { createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalProductEntity } from '@valmira/api/domain';
import { AdditionalProduct } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreateAdditionalProductDto } from '../dto/create-additional-product.dto';
import { GetAdditionalProductsDto } from '../dto/get-additional-products.dto';
import { UpdateAdditionalProductDto } from '../dto/update-additional-product.dto';

@Injectable()
export class AdditionalProductsService {
  constructor(
    @InjectRepository(AdditionalProductEntity) private additionalProductRepository: Repository<AdditionalProductEntity>
  ) {}

  async getAdditionalProducts(filterDto: GetAdditionalProductsDto): Promise<ApsCollectionResponse<AdditionalProduct>> {
    const { pageIndex, pageSize, onlyActives } = filterDto;
    const query = this.additionalProductRepository.createQueryBuilder('additionalProduct');

    if (onlyActives) {
      query.andWhere('(additionalProduct.active = true)');
    }

    filterCollectionQuery('additionalProduct', query, filterDto);

    const additionalProducts = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<AdditionalProduct>(additionalProducts, pageSize, pageIndex, total);
  }

  async getAdditionalProduct(id: number): Promise<AdditionalProduct> {
    const additionalProduct = await this.additionalProductRepository.findOne({ id });
    if (!additionalProduct) {
      throw new NotFoundException(`Additional product with id ${id} not found`);
    }
    return additionalProduct;
  }

  createAdditionalProduct(createAdditionalProductDto: CreateAdditionalProductDto): Promise<AdditionalProduct> {
    const additionalProduct = this.additionalProductRepository.create(createAdditionalProductDto);
    return this.additionalProductRepository.save(additionalProduct);
  }

  async updateAdditionalProduct(updateAdditionalProductDto: UpdateAdditionalProductDto): Promise<AdditionalProduct> {
    const additionalProduct = await this.getAdditionalProduct(updateAdditionalProductDto.id);
    return this.additionalProductRepository.save({ ...additionalProduct, ...updateAdditionalProductDto });
  }
}
