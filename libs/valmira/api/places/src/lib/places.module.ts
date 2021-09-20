import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { PlaceEntity, ReservationEntity } from '@valmira/api/domain';

import { PlacesController } from './controllers/places.controller';
import { PlacesService } from './services/places.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PlaceEntity, ReservationEntity])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
