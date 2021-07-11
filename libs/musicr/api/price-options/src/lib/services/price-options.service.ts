import { createCollectionResponse, filterCollectionQuery } from '@arphase/api';
import { ApsCollectionResponse } from '@arphase/common';
import { PriceOptionRepository } from '@musicr/api/domain';
import { PriceOption } from '@musicr/domain';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreatePriceOptionDto } from '../dto/create-price-option.dto';
import { GetPriceOptionsDto } from '../dto/get-price-options.dto';
import { UpdatePriceOptionDto } from '../dto/update-price-option.dto';

@Injectable()
export class PriceOptionsService {
  constructor(@Inject(PriceOptionRepository) private priceOptionRepository: PriceOptionRepository) {}

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
      await priceOption.save();
      return priceOption;
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`Producto con id ${createDto.productId} no existe`);
      }
    }
  }

  async updatePriceOption(updateDto: UpdatePriceOptionDto): Promise<PriceOption> {
    return await this.priceOptionRepository.save(updateDto);
  }

  async deletePriceOption(id: number): Promise<PriceOption> {
    const priceOption = await this.priceOptionRepository.findOne({ id });

    if (!priceOption) {
      throw new NotFoundException(`Opción de precio con id ${id} no existe`);
    }

    await this.priceOptionRepository.delete({ id });

    return priceOption;
  }
}
