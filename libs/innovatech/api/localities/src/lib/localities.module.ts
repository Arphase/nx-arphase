import { AuthDataModule } from '@innovatech/api/auth/data';
import { LocalityRepository } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalitiesController } from './controllers/localities.controller';
import { LocalitiesService } from './services/localities.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalityRepository]), AuthDataModule],
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
})
export class LocalitiesModule {}