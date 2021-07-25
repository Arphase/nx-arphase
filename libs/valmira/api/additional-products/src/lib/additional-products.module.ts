import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { AdditionalProductEntity } from '@valmira/api/domain';

import { AdditionalProductsController } from './controllers/additional-products.controller';
import { AdditionalProductsService } from './services/additional-products.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AdditionalProductEntity])],
  controllers: [AdditionalProductsController],
  providers: [AdditionalProductsService],
})
export class AdditionalProductsModule {}
