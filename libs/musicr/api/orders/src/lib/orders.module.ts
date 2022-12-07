import { AuthModule } from '@musicr/api/auth';
import {
  AdditionalOptionEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PriceOptionEntity,
  ProductEntity,
} from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      AdditionalOptionEntity,
      OrderEntity,
      OrderProductEntity,
      OrderProductAdditionalOptionEntity,
      PriceOptionEntity,
      ProductEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
