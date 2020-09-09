import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GuaranteesModule } from './guarantees';
import { LocalitiesModule } from './localities/localities.module';
import { PaymentOrdersModule } from './payment-orders/payment-orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, GuaranteesModule, LocalitiesModule, PaymentOrdersModule],
  controllers: [AppController],
})
export class AppModule {}
