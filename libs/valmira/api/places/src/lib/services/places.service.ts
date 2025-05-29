import { createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';
import { Place } from '@valmira/domain';
import { endOfDay, startOfDay } from 'date-fns';
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
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>,
  ) {}

  async getPlaces(filterDto: GetPlacesDto): Promise<ApsCollectionResponse<Place>> {
    const { pageIndex, pageSize, dateType } = filterDto;
    const query = await this.getPlacesQuery(filterDto);
    query
      .leftJoinAndSelect('place.photos', 'photo')
      .orderBy('place.createdAt', SortDirection.descend)
      .addOrderBy('photo.id', SortDirection.ascend);

    filterCollectionQuery('place', query, filterDto, { ignoreDates: dateType !== 'createdAt' });

    const places = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Place>(places, pageSize, pageIndex, total);
  }

  async getPlacesQuery(filterDto: GetPlacesDto): Promise<SelectQueryBuilder<PlaceEntity>> {
    const { startDate, endDate, dateType, onlyActives, capacity } = filterDto;
    const query = this.placeRepository.createQueryBuilder('place');

    if (onlyActives) {
      query.andWhere('(place.active = true)');
    }

    if (capacity) {
      query.andWhere('(place.capacity >= :capacity)', { capacity });
    }

    if (startDate && endDate && dateType !== 'createdAt') {
      const reservationQuery = this.reservationRepository.createQueryBuilder('reservation');
      reservationQuery.orWhere(`(reservation.startDate >= :startDate1 and reservation.startDate <= :endDate1)`, {
        startDate1: startOfDay(new Date(startDate)),
        endDate1: startOfDay(new Date(endDate)),
      });
      reservationQuery.orWhere(`(reservation.endDate >= :startDate2 and reservation.endDate2 <= :endDate)`, {
        startDate2: endOfDay(new Date(startDate)),
        endDate2: endOfDay(new Date(endDate)),
      });
      const reservations = await reservationQuery.getMany();
      const excludedPlacesIds = reservations.map(reservation => reservation.placeId);
      if (excludedPlacesIds.length) {
        query.andWhere('place.id NOT IN (:...excludedPlacesIds)', { excludedPlacesIds });
      }
    }
    return query;
  }

  async getPlace(id: number): Promise<PlaceEntity> {
    const place = await this.placeRepository.findOneBy({ id });
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  /**
   * Gets occupied dates
   * Check unit tests for query implementations
   * TODO: Replace unit test function for real database integration tests
   * @param id
   * @param [filterDto]
   * @returns occupied dates
   */
  async getOccupiedDates(id: number, filterDto?: OccupiedDatesDto): Promise<Date[]> {
    const { startDate, endDate, dateType } = filterDto;
    const query = this.reservationRepository.createQueryBuilder('reservation');
    if (startDate && endDate) {
      query.andWhere(
        `((reservation.startDate >= :startDate1 and reservation.startDate <= :endDate1) or
        (reservation.endDate >= :startDate2 and reservation.endDate <= :endDate2) or
        ((reservation.startDate)::date = (:startDate)::date and (reservation.endDate)::date = (:endDate)::date) or
        (reservation.startDate <= :startDate and :endDate <= reservation.endDate))`,
        {
          startDate1: endOfDay(new Date(startDate)),
          endDate1: startOfDay(new Date(endDate)),
          startDate2: endOfDay(new Date(startDate)),
          endDate2: startOfDay(new Date(endDate)),
          startDate,
          endDate,
        },
      );
    }
    query
      .andWhere(`(reservation.endDate >= :today)`, { today: startOfDay(new Date()).toISOString() })
      .andWhere('(reservation.placeId = :placeId)', { placeId: id })
      .orderBy('reservation.startDate', SortDirection.ascend);
    const reservations = await query.getMany();
    return getOccupiedDates(reservations, dateType);
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
