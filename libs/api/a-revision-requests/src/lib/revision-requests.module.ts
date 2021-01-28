import { AuthModule } from '@ivt/a-auth';
import { RevisionRequestRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevisionRequestController } from './controllers/revision-request.controller';
import { RevisionRequestService } from './services/revision-request.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([RevisionRequestRepository])],
  controllers: [RevisionRequestController],
  providers: [RevisionRequestService],
})
export class RevisionRequestsModule {}
