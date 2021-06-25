import { AuthModule } from '@musicr/api/auth';
import { ProductComponentRepository, ProductRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductComponentsController } from './controllers/product-components.controller';
import { ProductComponentsService } from './services/product-components.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProductRepository, ProductComponentRepository])],
  controllers: [ProductComponentsController],
  providers: [ProductComponentsService],
})
export class ProductComponentsModule {}
