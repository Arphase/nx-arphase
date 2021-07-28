import { AuthModule } from '@musicr/api/auth';
import { PriceOptionEntity } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PriceOptionsController } from './controllers/price-options.controller';
import { PriceOptionsService } from './services/price-options.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PriceOptionEntity])],
  controllers: [PriceOptionsController],
  providers: [PriceOptionsService],
})
export class PriceOptionsModule {}
