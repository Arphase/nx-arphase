import { AuthDataModule } from '@innovatech/api/auth/data';
import { RevisionRepository, VehicleRepository } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionsController } from './controllers/revisions.controller';
import { RevisionsService } from './services/revisions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionRepository, VehicleRepository]), AuthDataModule],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
