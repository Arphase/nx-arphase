import { AuthModule } from '@ivt/a-auth';
import { RevisionRepository, VehicleRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionsController } from './controllers/revisions.controller';
import { RevisionsService } from './services/revisions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionRepository, VehicleRepository]), AuthModule],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
