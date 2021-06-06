import { AuthDataModule } from '@innovatech/api/auth/data';
import { CompanyRepository, GroupRepository, ProductRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, GroupRepository, CompanyRepository]), AuthDataModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
