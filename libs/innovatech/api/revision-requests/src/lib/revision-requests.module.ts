import { AuthDataModule } from '@innovatech/api/auth/data';
import { RevisionRequestRepository } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionRequestController } from './controllers/revision-request.controller';
import { RevisionRequestService } from './services/revision-request.service';

@Module({
  imports: [AuthDataModule, TypeOrmModule.forFeature([RevisionRequestRepository])],
  controllers: [RevisionRequestController],
  providers: [RevisionRequestService],
})
export class RevisionRequestsModule {}
