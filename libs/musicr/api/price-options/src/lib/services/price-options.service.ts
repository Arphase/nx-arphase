import { createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { PriceOptionEntity } from '@musicr/api/domain';
import { PriceOption } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqBy } from 'lodash';
import { Repository } from 'typeorm';

import { CreatePriceOptionDto } from '../dto/create-price-option.dto';
import { GetPriceOptionsDto } from '../dto/get-price-options.dto';
import { UpdatePriceOptionDto } from '../dto/update-price-option.dto';

@Injectable()
export class PriceOptionsService {
  constructor(@InjectRepository(PriceOptionEntity) private priceOptionRepository: Repository<PriceOptionEntity>) {}

  async getPriceOptions(filterDto: GetPriceOptionsDto): Promise<ApsCollectionResponse<PriceOption>> {
    const { pageIndex, pageSize, productId } = filterDto;
    const query = this.priceOptionRepository
      .createQueryBuilder('priceOption')
      .andWhere('priceOption.productId = :productId', { productId });

    filterCollectionQuery('priceOption', query, filterDto);

    const priceOptions = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<PriceOption>(priceOptions, pageSize, pageIndex, total);
  }

  async createPriceOption(createDto: CreatePriceOptionDto): Promise<PriceOption> {
    try {
      const priceOption = this.priceOptionRepository.create(createDto);
      return this.priceOptionRepository.save(priceOption);
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`Producto con id ${createDto.productId} no existe`);
      }
    }
  }

  async updatePriceOption(updateDto: UpdatePriceOptionDto): Promise<PriceOption> {
    const preloadedPriceOption = await this.priceOptionRepository.preload(updateDto);
    await preloadedPriceOption.save();
    preloadedPriceOption.reload();
    preloadedPriceOption.photos = uniqBy(preloadedPriceOption.photos, 'id');
    return preloadedPriceOption;
  }

  async deletePriceOption(id: number): Promise<PriceOption> {
    const priceOption = await this.priceOptionRepository.findOneBy({ id });

    if (!priceOption) {
      throw new NotFoundException(`Opción de precio con id ${id} no existe`);
    }

    await this.priceOptionRepository.softRemove({ id });

    return priceOption;
  }
}
