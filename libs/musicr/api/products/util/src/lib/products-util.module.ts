import { ProductRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UpdateProductArrayPropertiesService } from './services/update-product-array-properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [UpdateProductArrayPropertiesService],
  exports: [UpdateProductArrayPropertiesService],
})
export class ProductsUtilModule {}
