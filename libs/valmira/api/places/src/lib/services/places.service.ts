import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from '@valmira/api/domain';
import { Place } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreatePlaceDto } from '../dto/create-place.dto';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>) {}

  async getPlaces(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Place>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.category', 'category')
      .orderBy('place.createdAt', SortDirection.descend);

    filterCollectionQuery('place', query, filterDto);

    const places = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Place>(places, pageSize, pageIndex, total);
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return this.placeRepository.save(place);
  }
}
