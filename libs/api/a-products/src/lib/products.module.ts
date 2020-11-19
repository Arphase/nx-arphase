import { AuthModule } from '@ivt/a-auth';
import { ProductRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
