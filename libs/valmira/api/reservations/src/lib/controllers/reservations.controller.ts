import { Body, Controller, Post } from '@nestjs/common';
import { Reservation } from '@valmira/domain';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationsService } from '../servicess/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  async createPlace(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.createReservation(createReservationDto);
  }
}
