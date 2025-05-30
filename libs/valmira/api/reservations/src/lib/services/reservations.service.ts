import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AdditionalProductEntity,
  CustomerEntity,
  PlaceEntity,
  PromocodeEntity,
  ReservationAdditionalProductEntity,
  ReservationEntity,
} from '@valmira/api/domain';
import { PlacesService } from '@valmira/api/places';
import { PromocodesService } from '@valmira/api/promocodes';
import { Promocode, Reservation, ReservationAdditionalProduct, ReservationStatus } from '@valmira/domain';
import dayjs from 'dayjs';
import { InjectStripe } from 'nestjs-stripe';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

import { CreatePaymentIntentDto } from '../dto/create-payment-intent.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { GetReservationDetailDto } from '../dto/get-reservation-detail-dto';
import { ReservationPreviewDto } from '../dto/reservation-preview.dto';
import { UpdateReservationDto } from '../dto/update-reservation-dto';
import { getReservationDaysInfo } from '../functions/reservation-days-info';
import { getReservationTotal } from '../functions/reservation-total';
import { getReservationConfirmEmail } from './reservations.service.constants';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>,
    @InjectRepository(PromocodeEntity) private promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(AdditionalProductEntity) private additionalProductRepository: Repository<AdditionalProductEntity>,
    @InjectRepository(ReservationAdditionalProductEntity)
    private reservationAdditionalProductRepository: Repository<ReservationAdditionalProductEntity>,
    @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
    @InjectStripe() private readonly stripeClient: Stripe,
    private placesService: PlacesService,
    private promocodeService: PromocodesService,
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
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    const { pricePerNight, nights, days } = getReservationDaysInfo(reservation);
    const additionalProducts = await this.getAdditionalProductsWithPrice(reservation.additionalProducts);
    return {
      ...reservation,
      pricePerNight,
      nights,
      days,
      ...getReservationTotal({
        ...reservation,
        pricePerNight,
        nights,
        additionalProducts,
      }),
    } as Reservation;
  }

  async getReservationDetail(filterDto: GetReservationDetailDto): Promise<ReservationEntity> {
    const { id, email } = filterDto;
    const reservation = await this.reservationRepository.findOneBy({ id, customer: { email } });
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
    const previewReservation = await this.previewReservation(createReservationDto, false);
    const reservation = this.reservationRepository.create(previewReservation);
    return this.reservationRepository.save(reservation);
  }

  /**
   * Previews reservation
   * Note: if reservationDto id exists we skip all validations of occupiedDates
   * We check the promocode with getPromocodeByName from promocodesService to verify expiration
   * @param reservationDto
   * @returns reservation with all populated data from database relations
   */
  async previewReservation(
    reservationPreviewDto: CreateReservationDto | UpdateReservationDto | ReservationPreviewDto | Reservation,
    isPreview = true,
  ): Promise<Partial<Reservation>> {
    const { placeId, promocodeId, startDate, endDate, id } = reservationPreviewDto;
    let { additionalProducts } = reservationPreviewDto;
    let promocode: Promocode;
    const place = await this.placeRepository.findOneBy({ id: placeId });
    if (!place) {
      throw new NotFoundException('Alojamiento no existe');
    }
    if (!id && !isPreview) {
      const occupiedDates = await this.placesService.getOccupiedDates(placeId, { startDate, endDate });
      if (occupiedDates.length) {
        throw new ConflictException('Esta cabaña ya ha sido reservada para las fechas que seleccionó');
      }
    }
    if (promocodeId) {
      promocode = await this.promocodeRepository.findOneBy({ id: promocodeId });
      if (!promocode) {
        throw new NotFoundException('Código de descuento no existe');
      }
      await this.promocodeService.getPromocodeByName(promocode.name);
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
      ...getReservationTotal({
        ...reservationPreviewDto,
        pricePerNight,
        promocode,
        nights,
        additionalProducts,
      } as Reservation),
    };
  }

  async updateReservation(updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.getReservation(updateReservationDto.id);
    const previewReservation = await this.previewReservation({ ...reservation, ...updateReservationDto }, false);
    const updatedReservation = await this.reservationRepository.preload(previewReservation);

    if (updateReservationDto?.paymentId) {
      const paymentDetails = await this.stripeClient.paymentIntents.retrieve(updateReservationDto.paymentId);
      if (reservation.paymentId || reservation.status === ReservationStatus.paid) {
        throw new ConflictException(`Esta reservación ya está pagada`);
      }
      if (!paymentDetails) {
        throw new ConflictException(`Este pago no existe`);
      }
      await this.sendConfirmationEmail(reservation);
      updatedReservation.status = ReservationStatus.paid;
    }

    if (updateReservationDto.customer) {
      const customer = this.customerRepository.create(updateReservationDto.customer);
      await customer.save();
      updatedReservation.customer = customer;
    }

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

  async getAdditionalProductsWithPrice(
    additionalProducts: ReservationAdditionalProduct[],
  ): Promise<ReservationAdditionalProduct[]> {
    const additionalProductEntities = await this.additionalProductRepository.findByIds(
      additionalProducts.map(product => product.additionalProductId),
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
          additionalProduct => additionalProduct.id === product.additionalProductId,
        );
        return {
          ...product,
          additionalProduct,
          price: additionalProduct.price,
        };
      });
    return additionalProducts;
  }

  /**
   * Creates payment intent
   * We multiply the amount by 100, because Stripe charges the client card in cents
   * @param payload
   * @returns payment intent
   */
  async createPaymentIntent(payload: CreatePaymentIntentDto): Promise<{ key: string; reservation: Reservation }> {
    const { reservationId } = payload;
    const reservation = await this.getReservation(reservationId);
    const previewReservation = await this.previewReservation(reservation, false);
    if (reservation.paymentId || reservation.status === ReservationStatus.paid) {
      throw new ConflictException(`Esta reservación ya extá pagada`);
    }
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: previewReservation.total * 100,
      currency: 'mxn',
    });
    return { key: paymentIntent.client_secret, reservation };
  }

  async sendConfirmationEmail(reservation: Reservation): Promise<void> {
    const transporter = createTransport({
      host: process.env.SMTP,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASS,
      },
    });

    const reservationUrl = `${process.env.APP_HOST_URL}/reservation-detail/${reservation?.id}?email=${reservation?.customer?.email}`;
    const mailOptions: Mail.Options = {
      from: `Valmira <${process.env.MAIL_ACCOUNT_SENDER}>`,
      to: reservation?.customer?.email,
      subject: `Reservación ${reservation.id} confirmada!`,
      attachments: [
        {
          filename: 'valmira-green.svg',
          path: __dirname + '/assets/img/valmira-green.svg',
          cid: 'logo',
        },
        {
          filename: 'place.png',
          path: reservation.place?.photos[0]?.path,
          cid: 'place',
        },
      ],
      html: getReservationConfirmEmail(reservation, reservationUrl),
    };
    await transporter.sendMail(mailOptions);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateVehicleStatusFromRevisions() {
    const query = this.reservationRepository.createQueryBuilder('reservation');
    query.andWhere(`(reservation.paymentId IS NULL)`);
    const reservations = await query.getMany();
    const hourAgo = dayjs().subtract(15, 'minutes');
    const expiredReservations = reservations.filter(reservation => dayjs(reservation.createdAt).isBefore(hourAgo));
    await this.reservationRepository.remove(expiredReservations);
  }
}
