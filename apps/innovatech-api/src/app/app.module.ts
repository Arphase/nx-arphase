import { AuthModule } from '@ivt/a-auth';
import { GroupsModule } from '@ivt/a-groups';
import { GuaranteesModule } from '@ivt/a-guarantees';
import { LocalitiesModule } from '@ivt/a-localities';
import { PaymentOrdersModule } from '@ivt/a-payment-orders';
import { ProductModule } from '@ivt/a-products';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    GroupsModule,
    GuaranteesModule,
    LocalitiesModule,
    PaymentOrdersModule,
    ProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
