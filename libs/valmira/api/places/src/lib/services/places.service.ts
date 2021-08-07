import {
  ApsCollectionFilterDto,
  createCollectionResponse,
  filterCollectionDates,
  filterCollectionQuery,
} from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';
import { Place } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreatePlaceDto } from '../dto/create-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>,
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>
  ) {}

  async getPlaces(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Place>> {
    const { pageIndex, pageSize, startDate, endDate, dateType } = filterDto;
    const query = this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.category', 'category')
      .orderBy('place.createdAt', SortDirection.descend);

    filterCollectionQuery('place', query, filterDto, { ignoreDates: dateType !== 'createdAt' });

    if (startDate && endDate && dateType !== 'createdAt') {
      const reservationQuery = this.reservationRepository.createQueryBuilder('reservation');
      filterCollectionDates(
        'reservation',
        reservationQuery,
        { ...filterDto, dateType: 'startDate' },
        { logicalOperator: 'or' }
      );
      filterCollectionDates(
        'reservation',
        reservationQuery,
        { ...filterDto, dateType: 'endDate' },
        { logicalOperator: 'or' }
      );
      const reservations = await reservationQuery.getMany();
      const excludedPlacesIds = reservations.map(reservation => reservation.placeId);
      console.log(excludedPlacesIds);
      query.andWhere('(place.id NOT IN (:...excludedPlacesIds))', { excludedPlacesIds });
    }

    const places = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Place>(places, pageSize, pageIndex, total);
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return this.placeRepository.save(place);
  }
}
