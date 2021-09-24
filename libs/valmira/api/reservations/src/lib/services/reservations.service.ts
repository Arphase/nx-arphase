import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AdditionalProductEntity,
  PlaceEntity,
  PromocodeEntity,
  ReservationAdditionalProductEntity,
  ReservationEntity,
} from '@valmira/api/domain';
import { PlacesService } from '@valmira/api/places';
import { Promocode, Reservation, ReservationAdditionalProduct } from '@valmira/domain';
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
    @InjectRepository(ReservationAdditionalProductEntity)
    private reservationAdditionalProductRepository: Repository<ReservationAdditionalProductEntity>,
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
    const { pricePerNight, nights, days } = getReservationDaysInfo(reservation);
    return {
      ...reservation,
      pricePerNight,
      nights,
      days,
    } as ReservationEntity;
  }

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const previewReservation = await this.previewReservation(createReservationDto);
    const reservation = this.reservationRepository.create(previewReservation);
    return this.reservationRepository.save(reservation);
  }

  /**
   * Previews reservation
   * Note: if reservationDto id exists we skip all validations of occupiedDates
   * @param reservationDto
   * @returns reservation with all populated data from database relations
   */
  async previewReservation(
    reservationPreviewDto: CreateReservationDto | UpdateReservationDto | ReservationPreviewDto
  ): Promise<Partial<Reservation>> {
    const { placeId, promocodeId, startDate, endDate, id } = reservationPreviewDto;
    let { additionalProducts } = reservationPreviewDto;
    let promocode: Promocode;
    const place = await this.placeRepository.findOne(placeId);
    if (!place) {
      throw new NotFoundException('Alojamiento no existe');
    }
    if (!id) {
      const occupiedDates = await this.placesService.getOccupiedDates(placeId, {
        startDate: dayjs(startDate).add(1, 'day').toDate(),
        endDate: dayjs(endDate).subtract(1, 'day').toDate(),
      });
      if (occupiedDates.length) {
        throw new ConflictException('Esta cabaña ya ha sido reservada para las fechas que seleccionó');
      }
    }
    if (promocodeId) {
      promocode = await this.promocodeRepository.findOne(promocodeId);
      if (!promocode) {
        throw new NotFoundException('Código de descuento no existe');
      }
    }
    if (additionalProducts?.length) {
      additionalProducts = await this.getAdditionalProductsWithPrice(additionalProducts);
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
    const previewReservation = await this.previewReservation({ ...reservation, ...updateReservationDto });
    const updatedReservation = await this.reservationRepository.preload(previewReservation);
    await updatedReservation.save();
    await updatedReservation.reload();
    const { pricePerNight, nights, days } = getReservationDaysInfo(updatedReservation);
    return {
      ...updatedReservation,
      pricePerNight,
      nights,
      days,
    } as ReservationEntity;
  }

  async deleteReservation(id: number): Promise<Reservation> {
    const reservation = await this.getReservation(id);
    return this.reservationRepository.remove(reservation);
  }

  async getAdditionalProductsWithPrice(
    additionalProducts: ReservationAdditionalProduct[]
  ): Promise<ReservationAdditionalProduct[]> {
    const additionalProductEntities = await this.additionalProductRepository.findByIds(
      additionalProducts.map(product => product.additionalProductId)
    );
    if (additionalProducts.length !== additionalProductEntities.length) {
      throw new NotFoundException('No se encontraron todos los productos adicionales');
    }
    const deletedProducts = additionalProducts.filter(product => product.destroy && product.id);
    if (deletedProducts.length) {
      const ids = deletedProducts.map(product => product.id);
      const entities = await this.reservationAdditionalProductRepository.findByIds(ids);
      if (!entities) {
        throw new NotFoundException('No se encontraron algunos productos en la reservación');
      }
      await this.reservationAdditionalProductRepository.remove(entities);
    }
    additionalProducts = additionalProducts
      .filter(product => !product.destroy)
      .map(product => {
        const additionalProduct = additionalProductEntities.find(
          additionalProduct => additionalProduct.id === product.additionalProductId
        );
        return {
          ...product,
          additionalProduct,
          price: additionalProduct.price,
        };
      });
    return additionalProducts;
  }
}
