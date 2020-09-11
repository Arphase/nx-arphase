import { Module } from '@nestjs/common';
import { LocalitiesController } from './controllers/localities.controller';
import { LocalitiesService } from './services/localities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalityRepository } from './data/locality.repository';
import { AuthModule } from '@ivt/a-auth';

@Module({
  imports: [TypeOrmModule.forFeature([LocalityRepository]), AuthModule],
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
})
export class LocalitiesModule {}
