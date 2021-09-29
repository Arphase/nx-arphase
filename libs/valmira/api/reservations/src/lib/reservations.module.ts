import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import {
  AdditionalProductEntity,
  PlaceEntity,
  PromocodeEntity,
  ReservationAdditionalProductEntity,
  ReservationEntity,
} from '@valmira/api/domain';
import { PlacesModule } from '@valmira/api/places';

import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [
    AuthModule,
    PlacesModule,
    TypeOrmModule.forFeature([
      AdditionalProductEntity,
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
