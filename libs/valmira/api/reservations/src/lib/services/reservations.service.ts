import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalProductEntity, PlaceEntity, PromocodeEntity, ReservationEntity } from '@valmira/api/domain';
import { PlacesService } from '@valmira/api/places';
import { Promocode, Reservation } from '@valmira/domain';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationPreviewDto } from '../dto/reservation-preview.dto';
import { UpdateReservationDto } from '../dto/update-reservation-dto';
import { getReservationDaysInfo } from '../functions/reservation-days-info';
import { getReservationTotal } from '../functions/reservation-total';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>,
    @InjectRepository(PromocodeEntity) private promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(AdditionalProductEntity) private additionalProductRepository: Repository<AdditionalProductEntity>,
    private placesService: PlacesService
  ) {}

  async getReservations(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Reservation>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.customer', 'customer')
      .leftJoinAndSelect('reservation.place', 'place');

    filterCollectionQuery('reservation', query, filterDto);

    const promcodes = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Reservation>(promcodes, pageSize, pageIndex, total);
  }

  async getReservation(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return reservation;
  }

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const previewReservation = await this.previewReservation(createReservationDto);
    const reservation = this.reservationRepository.create(previewReservation);
    return this.reservationRepository.save(reservation);
  }

  async previewReservation(reservationPreviewDto: ReservationPreviewDto): Promise<Partial<Reservation>> {
    const { placeId, promocodeId, startDate, endDate } = reservationPreviewDto;
    let { additionalProducts } = reservationPreviewDto;
    const place = await this.placeRepository.findOne(placeId);
    let promocode: Promocode;
    if (!place) {
      throw new NotFoundException('Alojamiento no existe');
    }
    const occupiedDates = await this.placesService.getOccupiedDates(placeId, {
      startDate: dayjs(startDate).add(1, 'day').toDate(),
      endDate: dayjs(endDate).subtract(1, 'day').toDate(),
    });
    if (occupiedDates.length) {
      throw new ConflictException('Esta cabaña ya ha sido reservada para las fechas que seleccionó');
    }
    if (promocodeId) {
      promocode = await this.promocodeRepository.findOne(promocodeId);
      if (!promocode) {
        throw new NotFoundException('Código de descuento no existe');
      }
    }
    if (additionalProducts?.length) {
      const additionalProductEntities = await this.additionalProductRepository.findByIds(
        additionalProducts.map(product => product.additionalProductId)
      );
      if (additionalProducts.length !== additionalProductEntities.length) {
        throw new NotFoundException('No se encontraron todos los productos adicionales');
      }
      additionalProducts = additionalProducts.map(product => {
        const additionalProduct = additionalProductEntities.find(
          additionalProduct => additionalProduct.id === product.additionalProductId
        );
        return {
          ...product,
          additionalProduct,
          price: additionalProduct.price,
        };
      });
    }
    const { pricePerNight, nights, days } = getReservationDaysInfo({ ...reservationPreviewDto, place });
    return {
      ...reservationPreviewDto,
      place,
      pricePerNight,
      days,
      nights,
      promocode,
      discount: promocode?.amount ? promocode.amount : 0,
      additionalProducts,
      total: getReservationTotal({
        ...reservationPreviewDto,
        pricePerNight,
        promocode,
        nights,
        additionalProducts,
      }),
    };
  }

  async updateReservation(updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.getReservation(updateReservationDto.id);
    const updatedReservation = await this.reservationRepository.preload({ ...reservation, ...updateReservationDto });
    await updatedReservation.save();
    await updatedReservation.reload();
    return updatedReservation;
  }

  async deleteReservation(id: number): Promise<Reservation> {
    const reservation = await this.getReservation(id);
    return this.reservationRepository.remove(reservation);
  }
}