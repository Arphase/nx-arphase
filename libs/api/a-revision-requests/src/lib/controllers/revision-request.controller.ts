import { GetUser, Roles, RolesGuard } from '@ivt/a-auth';
import { CreateRevisionRequestDto } from '@ivt/a-state';
import { User, UserRoles } from '@ivt/c-data';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RevisionRequestService } from '../services/revision-request.service';

@Controller('revision-requests')
@UseGuards(AuthGuard(), RolesGuard)
export class RevisionRequestController {
  constructor(private revisionRequestsService: RevisionRequestService) {}

  @Post()
  @Roles(UserRoles.agencyUser)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRevision(@Body() createRevisionRequestDto: CreateRevisionRequestDto, @GetUser() user: Partial<User>) {
    return this.revisionRequestsService.createRevisionRequest(createRevisionRequestDto, user);
  }
}
