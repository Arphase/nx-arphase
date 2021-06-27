import { ProductRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
