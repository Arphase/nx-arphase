import { ApsCollectionResponse } from '@arphase/common';
import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { RevisionRequest, User, UserRoles } from '@innovatech/common/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateRevisionRequestDto } from '../dto/create-revision-request.dto';
import { GetRevisionRequestsDto } from '../dto/get-revision-requests.dto';
import { UpdateRevisionRequestDto } from '../dto/update-revision-request.dto';
import { RevisionRequestService } from '../services/revision-request.service';

@Controller('revision-requests')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RevisionRequestController {
  constructor(private revisionRequestsService: RevisionRequestService) {}

  @Get()
  async getRevisionRequests(
    @Query() filterDto: GetRevisionRequestsDto,
    @GetUser() user: Partial<User>
  ): Promise<ApsCollectionResponse<RevisionRequest>> {
    return this.revisionRequestsService.getRevisionRequests(filterDto, user);
  }

  @Get(':id')
  async getRevision(@Param('id', ParseIntPipe) id: number): Promise<RevisionRequest> {
    return this.revisionRequestsService.getRevisionRequest(id);
  }

  @Post()
  @Roles(UserRoles.agencyUser)
  async createRevisionRequest(
    @Body() createRevisionRequestDto: CreateRevisionRequestDto,
    @GetUser() user: Partial<User>
  ): Promise<RevisionRequest> {
    return this.revisionRequestsService.createRevisionRequest(createRevisionRequestDto, user);
  }

  @Put(':id')
  async updateRevisionRequest(
    @Body() updateRevisionRequestDto: UpdateRevisionRequestDto,
    @GetUser() user: Partial<User>
  ): Promise<RevisionRequest> {
    return this.revisionRequestsService.updateRevisionRequest(updateRevisionRequestDto, user);
  }
}
