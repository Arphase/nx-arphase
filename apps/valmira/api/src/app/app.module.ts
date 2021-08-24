import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalProductsModule } from '@valmira/api/additional-products';
import { AuthModule } from '@valmira/api/auth';
import { CategoriesModule } from '@valmira/api/categories';
import { PhotosModule } from '@valmira/api/photos';
import { PlacesModule } from '@valmira/api/places';
import { PromocodesModule } from '@valmira/api/promocodes';
import { ReservationsModule } from '@valmira/api/reservations';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AdditionalProductsModule,
    AuthModule,
    CategoriesModule,
    PhotosModule,
    PlacesModule,
    PromocodesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
