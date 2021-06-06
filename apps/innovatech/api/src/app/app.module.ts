import { AuthDataModule } from '@innovatech/api/auth/data';
import { AuthModule } from '@innovatech/api/auth/feature';
import { CompaniesModule } from '@innovatech/api/companies';
import { GroupsModule } from '@innovatech/api/groups';
import { GuaranteesModule } from '@innovatech/api/guarantees';
import { UsersModule } from '@innovatech/api/users';
import { LocalitiesModule } from '@ivt/a-localities';
import { PaymentOrdersModule } from '@ivt/a-payment-orders';
import { ProductModule } from '@ivt/a-products';
import { RevisionRequestsModule } from '@ivt/a-revision-requests';
import { RevisionsModule } from '@ivt/a-revisions';
import { VehiclesModule } from '@ivt/a-vehicles';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(config),
    AuthModule,
    AuthDataModule,
    CompaniesModule,
    GroupsModule,
    GuaranteesModule,
    LocalitiesModule,
    PaymentOrdersModule,
    ProductModule,
    RevisionRequestsModule,
    RevisionsModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
