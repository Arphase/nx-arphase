import { AuthModule } from '@musicr/api/auth';
import { OrderRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
