import { AuthModule } from '@ivt/a-auth';
import { GuaranteesModule } from '@ivt/a-guarantees';
import { LocalitiesModule } from '@ivt/a-localities';
import { PaymentOrdersModule } from '@ivt/a-payment-orders';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, GuaranteesModule, LocalitiesModule, PaymentOrdersModule],
  controllers: [AppController],
})
export class AppModule {}
