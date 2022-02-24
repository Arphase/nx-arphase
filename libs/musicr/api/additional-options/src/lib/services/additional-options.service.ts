import { createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { AdditionalOptionEntity } from '@musicr/api/domain';
import { AdditionalOption } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAdditionalOptionDto } from '../dto/create-additional-option.dto';
import { GetAdditionalOptionsDto } from '../dto/get-additional-options.dto';
import { UpdateAdditionalOptionDto } from '../dto/update-additional-option.dto';

@Injectable()
export class AdditionalOptionsService {
  constructor(
    @InjectRepository(AdditionalOptionEntity) private additionalOptionRepository: Repository<AdditionalOptionEntity>
  ) {}

  async getAdditionalOptions(filterDto: GetAdditionalOptionsDto): Promise<ApsCollectionResponse<AdditionalOption>> {
    const { pageIndex, pageSize, productId } = filterDto;
    const query = this.additionalOptionRepository
      .createQueryBuilder('additionalOption')
      .andWhere('additionalOption.productId = :productId', { productId });

    filterCollectionQuery('additionalOption', query, filterDto);

    const priceOptions = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<AdditionalOption>(priceOptions, pageSize, pageIndex, total);
  }

  async createAdditionalOption(createDto: CreateAdditionalOptionDto): Promise<AdditionalOption> {
    try {
      const additionalOption = this.additionalOptionRepository.create(createDto);
      return this.additionalOptionRepository.save(additionalOption);
    } catch (e) {
      if (e.code === '23503') {
        throw new NotFoundException(`Producto con id ${createDto.productId} no existe`);
      }
    }
  }

  async updateAdditionalOption(updateDto: UpdateAdditionalOptionDto): Promise<AdditionalOption> {
    return await this.additionalOptionRepository.save(updateDto);
  }

  async deleteAdditionalOption(id: number): Promise<AdditionalOption> {
    const additionalOption = await this.additionalOptionRepository.findOne({ id });

    if (!additionalOption) {
      throw new NotFoundException(`Opción adicional con id ${id} no existe`);
    }

    await this.additionalOptionRepository.softDelete({ id });

    return additionalOption;
  }
}
