import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromocodeEntity } from '@valmira/api/domain';
import { Promocode } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(@InjectRepository(PromocodeEntity) private promocodeRepository: Repository<PromocodeEntity>) {}

  async getPromocodes(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Promocode>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.promocodeRepository.createQueryBuilder('promocode');

    filterCollectionQuery('promocode', query, filterDto);

    const promcodes = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Promocode>(promcodes, pageSize, pageIndex, total);
  }

  async getPromocode(id: number): Promise<Promocode> {
    const promocode = await this.promocodeRepository.findOne({ id });
    if (!promocode) {
      throw new NotFoundException(`Promocode with id ${id} not found`);
    }
    return promocode;
  }

  createPromocode(createPromocodeDto: CreatePromocodeDto): Promise<Promocode> {
    const promocode = this.promocodeRepository.create(createPromocodeDto);
    return this.promocodeRepository.save(promocode);
  }

  async updatePromocode(updatePromocodeDto: UpdatePromocodeDto): Promise<Promocode> {
    const promocode = await this.getPromocode(updatePromocodeDto.id);
    return this.promocodeRepository.save({ ...promocode, ...updatePromocodeDto });
  }
}