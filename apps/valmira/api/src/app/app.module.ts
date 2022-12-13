import { AngularUniversalModule, loadEsmModule } from '@arphase/api/core';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
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

import { typeormConfig } from '../db/config/ormconfig';

@Module({
  imports: [
    ...(process.env['NODE' + '_ENV'] === 'production'
      ? [
          AngularUniversalModule.forRoot(async () => {
            const angularModule = await loadEsmModule<{
              default: typeof import('../../../app/src/app/app.server.module');
            }>(join(process.cwd(), 'dist/apps/valmira/server/main.js'));

            return {
              bootstrap: angularModule.default.AppServerModule,
              ngExpressEngine: (angularModule.default as any).ngExpressEngine,
              viewsPath: join(process.cwd(), 'dist/apps/valmira/browser'),
            };
          }),
        ]
      : []),
    TypeOrmModule.forRoot(typeormConfig),
    ScheduleModule.forRoot(),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
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
