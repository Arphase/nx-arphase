import { CreateRevisionRequestDto } from '@ivt/a-state';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RevisionRequestService } from '../services/revision-request.service';

@Controller('revision-requests')
@UseGuards(AuthGuard())
export class RevisionRequestController {
  constructor(private revisionRequestsService: RevisionRequestService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRevision(@Body() createRevisionRequestDto: CreateRevisionRequestDto) {
    return this.revisionRequestsService.createRevisionRequest(createRevisionRequestDto);
  }
}
