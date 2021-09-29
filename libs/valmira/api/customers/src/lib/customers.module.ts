import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@valmira/api/domain';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
