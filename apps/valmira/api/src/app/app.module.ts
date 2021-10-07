import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalProductsModule } from '@valmira/api/additional-products';
import { AuthModule } from '@valmira/api/auth';
import { CustomersModule } from '@valmira/api/customers';
import { PhotosModule } from '@valmira/api/photos';
import { PlacesModule } from '@valmira/api/places';
import { PromocodesModule } from '@valmira/api/promocodes';
import { ReservationsModule } from '@valmira/api/reservations';
import { StripeModule } from 'nestjs-stripe';
import { join } from 'path';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from '../../../app/src/app/app.server.module';
import config from '../db/config/ormconfig';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/apps/valmira/browser'),
    }),
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
})
export class AppModule {}
