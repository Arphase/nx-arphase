import { AuthModule } from '@musicr/api/auth';
import { AdditionalOptionEntity } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdditionalOptionsController } from './controllers/additional-options.controller';
import { AdditionalOptionsService } from './services/additional-options.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AdditionalOptionEntity])],
  controllers: [AdditionalOptionsController],
  providers: [AdditionalOptionsService],
})
export class AdditionalOptionsModule {}
