import { AuthModule } from '@musicr/api/auth';
import { PriceOptionEntity, ProductEntity } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PriceOptionEntity, ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
