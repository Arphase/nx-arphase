import { createCollectionResponse, filterCollectionDates, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';
import { Place, PlaceCategories, PlaceCategorySummary } from '@valmira/domain';
import { startOfDay } from 'date-fns';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreatePlaceDto } from '../dto/create-place.dto';
import { GetPlacesDto } from '../dto/get-places.dto';
import { OccupiedDatesDto } from '../dto/occupied-dates.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { getOccupiedDates } from '../functions/occupied-dates';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>,
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>
  ) {}

  async getPlaces(filterDto: GetPlacesDto): Promise<ApsCollectionResponse<Place>> {
    const { pageIndex, pageSize, dateType } = filterDto;
    const query = await this.getPlacesQuery(filterDto);
    query.leftJoinAndSelect('place.photos', 'photos').orderBy('place.createdAt', SortDirection.descend);

    filterCollectionQuery('place', query, filterDto, { ignoreDates: dateType !== 'createdAt' });

    const places = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Place>(places, pageSize, pageIndex, total);
  }

  async getPlacesQuery(filterDto: GetPlacesDto, ignoreCategory?: boolean): Promise<SelectQueryBuilder<PlaceEntity>> {
    const { startDate, endDate, dateType, onlyActives, capacity, category } = filterDto;
    const query = this.placeRepository.createQueryBuilder('place');

    if (onlyActives) {
      query.andWhere('(place.active = true)');
    }

    if (capacity) {
      query.andWhere('(place.capacity >= :capacity)', { capacity });
    }

    if (category && !ignoreCategory) {
      query.andWhere('(place.category = :category)', { category });
    }

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
      if (excludedPlacesIds.length) {
        query.andWhere('place.id NOT IN (:...excludedPlacesIds)', { excludedPlacesIds });
      }
    }
    return query;
  }

  async getPlace(id: number): Promise<PlaceEntity> {
    const place = await this.placeRepository.findOne({ id });
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  async getOccupiedDates(id: number, filterDto?: OccupiedDatesDto): Promise<Date[]> {
    const query = this.reservationRepository.createQueryBuilder('reservation');
    if (filterDto) {
      filterCollectionDates('reservation', query, { ...filterDto, dateType: 'startDate' }, { logicalOperator: 'or' });
      filterCollectionDates('reservation', query, { ...filterDto, dateType: 'endDate' }, { logicalOperator: 'or' });
    }
    query
      .andWhere(`(reservation.endDate >= :today)`, { today: startOfDay(new Date()).toISOString() })
      .andWhere('(reservation.placeId = :placeId)', { placeId: id })
      .orderBy('reservation.startDate', SortDirection.ascend);
    const reservations = await query.getMany();
    return getOccupiedDates(reservations);
  }

  async getPlacesCountByCategory(filterDto: GetPlacesDto): Promise<PlaceCategorySummary> {
    const query = await this.getPlacesQuery(filterDto, true);
    query.select('place.category', 'category').addSelect('COUNT(*)', 'amount').groupBy('place.category');
    const result = await query.getRawMany();
    return result.map(element => ({ ...element, category: PlaceCategories[element.category] }));
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    const newPlace = await this.placeRepository.save(place);
    const photos = createPlaceDto.photos.map(photo => ({ ...photo, placeId: newPlace.id }));
    newPlace.photos = photos;
    return newPlace.save();
  }

  async updatePlace(updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.getPlace(updatePlaceDto.id);
    (updatePlaceDto.photos || []).map(photo => ({ ...photo, placeId: updatePlaceDto.id }));
    const updatedReservation = await this.placeRepository.preload({ ...place, ...updatePlaceDto });
    await updatedReservation.save();
    await updatedReservation.reload();
    return updatedReservation;
  }
}
