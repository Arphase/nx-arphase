import { AuthModule } from '@ivt/a-auth';
import { PaymentOrderRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentOrdersController } from './controllers/payment-orders.controller';
import { PaymentOrdersService } from './services/payment-orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOrderRepository]), AuthModule],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
