import { AuthModule } from '@musicr/api/auth';
import { PriceOptionRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PriceOptionsController } from './controllers/price-options.controller';
import { PriceOptionsService } from './services/price-options.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PriceOptionRepository])],
  controllers: [PriceOptionsController],
  providers: [PriceOptionsService],
})
export class PriceOptionsModule {}
