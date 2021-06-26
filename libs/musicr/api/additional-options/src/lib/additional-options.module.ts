import { AdditionalOptionRepository } from '@musicr/api/domain';
import { ProductsUtilModule } from '@musicr/api/products/util';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdditionalOptionsController } from './controllers/additional-options.controller';
import { AdditionalOptionsService } from './services/additional-options.service';

@Module({
  imports: [ProductsUtilModule, TypeOrmModule.forFeature([AdditionalOptionRepository])],
  controllers: [AdditionalOptionsController],
  providers: [AdditionalOptionsService],
})
export class AdditionalOptionsModule {}
