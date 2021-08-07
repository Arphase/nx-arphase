import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';
import { Reservation } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationPreviewDto } from '../dto/reservation-preview.dto';
import { UpdateReservationDto } from '../dto/update-reservation-dto';
import { getPricePerNight } from '../functions/price-per-night';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>
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
    const place = await this.placeRepository.findOne(reservationPreviewDto.placeId);
    if (!place) {
      throw new NotFoundException('Este alojamiento no existe');
    }
    return {
      ...reservationPreviewDto,
      place,
      pricePerNight: getPricePerNight({ ...reservationPreviewDto, place }),
      total: this.getTotal(reservationPreviewDto),
    };
  }

  getTotal(reservation: Partial<Reservation>): number {
    return 0;
  }

  async updateReservation(updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.getReservation(updateReservationDto.id);
    const updatedReservation = await this.reservationRepository.preload({ ...reservation, ...updateReservationDto });
    await updatedReservation.save();
    await updatedReservation.reload();
    return updatedReservation;
  }
}
