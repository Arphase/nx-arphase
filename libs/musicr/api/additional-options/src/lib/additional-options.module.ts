import { AuthModule } from '@musicr/api/auth';
import { AdditionalOptionRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdditionalOptionsController } from './controllers/additional-options.controller';
import { AdditionalOptionsService } from './services/additional-options.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AdditionalOptionRepository])],
  controllers: [AdditionalOptionsController],
  providers: [AdditionalOptionsService],
})
export class AdditionalOptionsModule {}
