import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { PlaceEntity } from '@valmira/api/domain';

import { PlacesController } from './controllers/places.controller';
import { PlacesService } from './services/places.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PlaceEntity])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
