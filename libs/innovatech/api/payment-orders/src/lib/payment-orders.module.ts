import { AuthDataModule } from '@innovatech/api/auth/data';
import { GuaranteeEntity, PaymentOrderEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentOrdersController } from './controllers/payment-orders.controller';
import { PaymentOrdersService } from './services/payment-orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuaranteeEntity, PaymentOrderEntity]), AuthDataModule],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
