import { AuthDataModule } from '@innovatech/api/auth/data';
import { RevisionEntity, VehicleEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionsController } from './controllers/revisions.controller';
import { RevisionsService } from './services/revisions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionEntity, VehicleEntity]), AuthDataModule],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
