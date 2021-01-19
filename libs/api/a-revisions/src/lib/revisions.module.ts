import { AuthModule } from '@ivt/a-auth';
import { RevisionRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionsController } from './controllers/revisions.controller';
import { RevisionsService } from './services/revisions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionRepository]), AuthModule],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
