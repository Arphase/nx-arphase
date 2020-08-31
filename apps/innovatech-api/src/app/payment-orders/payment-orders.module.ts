import { Module } from '@nestjs/common';
import { PaymentOrdersController } from './controllers/payment-orders.controller';
import { PaymentOrdersService } from './services/payment-orders.service';
import { PaymentOrderRepository } from './data/payment-order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOrderRepository]), AuthModule],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
