import { AuthModule } from '@ivt/a-auth';
import { LocalityRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalitiesController } from './controllers/localities.controller';
import { LocalitiesService } from './services/localities.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalityRepository]), AuthModule],
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
})
export class LocalitiesModule {}
