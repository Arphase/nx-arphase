import { AuthModule } from '@ivt/a-auth';
import { CompaniesModule } from '@ivt/a-companies';
import { GroupsModule } from '@ivt/a-groups';
import { GuaranteesModule } from '@ivt/a-guarantees';
import { LocalitiesModule } from '@ivt/a-localities';
import { PaymentOrdersModule } from '@ivt/a-payment-orders';
import { ProductModule } from '@ivt/a-products';
import { UsersModule } from '@ivt/a-users';
import { VehiclesModule } from '@ivt/a-vehicles';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    CompaniesModule,
    GroupsModule,
    GuaranteesModule,
    LocalitiesModule,
    PaymentOrdersModule,
    ProductModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
