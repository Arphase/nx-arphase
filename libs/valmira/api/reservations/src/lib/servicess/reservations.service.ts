import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '@valmira/api/domain';
import { Reservation } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreateReservationDto } from '../dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>) {}

  createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create({ ...createReservationDto, total: 0 });
    return this.reservationRepository.save(reservation);
  }
}
