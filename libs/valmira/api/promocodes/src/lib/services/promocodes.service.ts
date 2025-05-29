import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromocodeEntity } from '@valmira/api/domain';
import { Promocode } from '@valmira/domain';
import { endOfDay, startOfDay } from 'date-fns';
import { Repository } from 'typeorm';

import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(@InjectRepository(PromocodeEntity) private promocodeRepository: Repository<PromocodeEntity>) {}

  async getPromocodes(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Promocode>> {
    const { pageIndex, pageSize, text } = filterDto;
    const query = this.promocodeRepository.createQueryBuilder('promocode');

    if (text) {
      query.andWhere(`(LOWER(promocode.name) like :text)`, { text: `%${text.toLowerCase()}%` });
    }

    filterCollectionQuery('promocode', query, filterDto);

    const promcodes = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Promocode>(promcodes, pageSize, pageIndex, total);
  }

  async getPromocode(id: number): Promise<PromocodeEntity> {
    const promocode = await this.promocodeRepository.findOneBy({ id });
    if (!promocode) {
      throw new NotFoundException(`Promocode with id ${id} not found`);
    }
    return promocode;
  }

  /**
   * Gets promocode by name
   * We are filtering the startDate and endDate because we only want to return not espired promocodes
   * @param name
   * @returns promocode by name
   */
  async getPromocodeByName(name: string): Promise<PromocodeEntity> {
    const query = this.promocodeRepository.createQueryBuilder('promocode');
    query.andWhere(`(promocode.name like :name)`, { name });
    query.andWhere(`(promocode.startDate <= :endOfToday and :startOfToday <= promocode.endDate )`, {
      startOfToday: startOfDay(new Date()).toISOString(),
      endOfToday: endOfDay(new Date()).toISOString(),
    });
    const promocode = await query.getOne();
    if (!promocode) {
      throw new NotFoundException(`Promocode with name ${name} not found or is expired`);
    }
    if (!promocode.active) {
      throw new ConflictException('Este código no está activo');
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

  async deletePromocode(id: number): Promise<Promocode> {
    const promocode = await this.getPromocode(id);
    try {
      await this.promocodeRepository.remove(promocode);
      return promocode;
    } catch (e) {
      if (e.code === '23503') {
        throw new ConflictException(
          'No se puede eliminar el promocode porque existen reservaciones con este promocode',
        );
      }
    }
  }
}
