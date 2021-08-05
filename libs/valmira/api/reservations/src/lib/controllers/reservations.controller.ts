import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Reservation } from '@valmira/domain';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation-dto';
import { ReservationsService } from '../servicess/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  async getReservations(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Reservation>> {
    return this.reservationsService.getReservations(filterDto);
  }

  @Get(':id')
  async getAdditionalProduct(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reservationsService.getReservation(id);
  }

  @Post()
  async createPlace(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.createReservation(createReservationDto);
  }

  @Put(':id')
  async updateAdditionalProduct(@Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return this.reservationsService.updatePromocode(updateReservationDto);
  }
}
