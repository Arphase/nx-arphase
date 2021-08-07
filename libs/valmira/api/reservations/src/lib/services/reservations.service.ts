import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalProductEntity, PlaceEntity, PromocodeEntity, ReservationEntity } from '@valmira/api/domain';
import { Promocode, Reservation } from '@valmira/domain';
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
    @InjectRepository(AdditionalProductEntity) private additionalProductRepository: Repository<AdditionalProductEntity>
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

  async getReservation(id: number): Promise<Reservation> {
    const promocode = await this.reservationRepository.findOne({ id });
    if (!promocode) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return promocode;
  }

  createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create({ ...createReservationDto, total: 0 });
    return this.reservationRepository.save(reservation);
  }

  async previewReservation(reservationPreviewDto: ReservationPreviewDto): Promise<Partial<Reservation>> {
    const { placeId, promocodeId } = reservationPreviewDto;
    let { reservationAdditionalProducts } = reservationPreviewDto;
    const place = await this.placeRepository.findOne(placeId);
    let promocode: Promocode;
    if (!place) {
      throw new NotFoundException('Alojamiento no existe');
    }
    if (promocodeId) {
      promocode = await this.promocodeRepository.findOne(promocodeId);
      if (!promocode) {
        throw new NotFoundException('Código de descuento no existe');
      }
    }
    if (reservationAdditionalProducts?.length) {
      const additionalProducts = await this.additionalProductRepository.findByIds(
        reservationAdditionalProducts.map(product => product.additionalProductId)
      );
      if (additionalProducts.length !== reservationAdditionalProducts.length) {
        throw new NotFoundException('No se encontraron todos los productos adicionales');
      }
      reservationAdditionalProducts = reservationAdditionalProducts.map(product => ({
        ...product,
        additionalProduct: additionalProducts.find(
          additionalProduct => additionalProduct.id === product.additionalProductId
        ),
      }));
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
      reservationAdditionalProducts,
      total: getReservationTotal({
        ...reservationPreviewDto,
        pricePerNight,
        promocode,
        nights,
        reservationAdditionalProducts,
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
}
