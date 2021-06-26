import { AuthModule } from '@musicr/api/auth';
import { ProductComponentRepository } from '@musicr/api/domain';
import { ProductsUtilModule } from '@musicr/api/products/util';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductComponentsController } from './controllers/product-components.controller';
import { ProductComponentsService } from './services/product-components.service';

@Module({
  imports: [AuthModule, ProductsUtilModule, TypeOrmModule.forFeature([ProductComponentRepository])],
  controllers: [ProductComponentsController],
  providers: [ProductComponentsService],
})
export class ProductComponentsModule {}
