import { AuthDataModule } from '@innovatech/api/auth/data';
import { CompanyEntity, GroupEntity, ProductEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, GroupEntity, CompanyEntity]), AuthDataModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
