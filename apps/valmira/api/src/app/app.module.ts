import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalProductsModule } from '@valmira/api/additional-products';
import { AuthModule } from '@valmira/api/auth';
import { CustomersModule } from '@valmira/api/customers';
import { PhotosModule } from '@valmira/api/photos';
import { PlacesModule } from '@valmira/api/places';
import { PromocodesModule } from '@valmira/api/promocodes';
import { ReservationsModule } from '@valmira/api/reservations';
import { StripeModule } from 'nestjs-stripe';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2020-08-27' }),
    TypeOrmModule.forRoot(config),
    AdditionalProductsModule,
    AuthModule,
    CustomersModule,
    PhotosModule,
    PlacesModule,
    PromocodesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
