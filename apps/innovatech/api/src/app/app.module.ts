import { AuthDataModule } from '@innovatech/api/auth/data';
import { AuthModule } from '@innovatech/api/auth/feature';
import { CompaniesModule } from '@innovatech/api/companies';
import { GroupsModule } from '@innovatech/api/groups';
import { GuaranteesModule } from '@innovatech/api/guarantees';
import { LocalitiesModule } from '@innovatech/api/localities';
import { PaymentOrdersModule } from '@innovatech/api/payment-orders';
import { ProductsModule } from '@innovatech/api/products/feature';
import { RevisionRequestsModule } from '@innovatech/api/revision-requests';
import { RevisionsModule } from '@innovatech/api/revisions';
import { UsersModule } from '@innovatech/api/users';
import { VehiclesModule } from '@innovatech/api/vehicles';
import { InnovatechApiDbModule } from '@innovatech/api/db';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';

@Module({
  imports: [
    InnovatechApiDbModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(),
    AuthModule,
    AuthDataModule,
    CompaniesModule,
    GroupsModule,
    GuaranteesModule,
    LocalitiesModule,
    PaymentOrdersModule,
    ProductsModule,
    RevisionRequestsModule,
    RevisionsModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
