import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import {
  AdditionalProductEntity,
  CustomerEntity,
  PlaceEntity,
  PromocodeEntity,
  ReservationAdditionalProductEntity,
  ReservationEntity,
} from '@valmira/api/domain';
import { PlacesModule } from '@valmira/api/places';
import { PromocodesModule } from '@valmira/api/promocodes';

import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [
    AuthModule,
    PlacesModule,
    PromocodesModule,
    TypeOrmModule.forFeature([
      AdditionalProductEntity,
      CustomerEntity,
      PromocodeEntity,
      PlaceEntity,
      ReservationEntity,
      ReservationAdditionalProductEntity,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
