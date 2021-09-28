import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Reservation } from '@valmira/domain';

import { CreatePaymentIntentDto } from '../dto/create-payment-intent.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { GetReservationDetailDto } from '../dto/get-reservation-detail-dto';
import { ReservationPreviewDto } from '../dto/reservation-preview.dto';
import { UpdateReservationDto } from '../dto/update-reservation-dto';
import { ReservationsService } from '../services/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  async getReservations(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Reservation>> {
    return this.reservationsService.getReservations(filterDto);
  }

  @Get(':id')
  async getReservation(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reservationsService.getReservation(id);
  }

  @Get('detail/search')
  async getReservationDetail(@Query() filterDto: GetReservationDetailDto): Promise<Reservation> {
    return this.reservationsService.getReservationDetail(filterDto);
  }

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.createReservation(createReservationDto);
  }

  @Post('preview')
  async previewReservation(@Body() reservationPreviewDto: ReservationPreviewDto): Promise<Partial<Reservation>> {
    return this.reservationsService.previewReservation(reservationPreviewDto);
  }

  @Put(':id')
  async updateReservation(@Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return this.reservationsService.updateReservation(updateReservationDto);
  }

  @Delete(':id')
  deleteReservation(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reservationsService.deleteReservation(id);
  }

  @Post('payment/intent')
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto
  ): Promise<{ key: string; reservation: Reservation }> {
    return this.reservationsService.createPaymentIntent(createPaymentIntentDto);
  }
}
