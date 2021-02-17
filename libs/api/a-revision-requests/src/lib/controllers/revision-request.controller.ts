import { GetUser, Roles, RolesGuard } from '@ivt/a-auth';
import { CreateRevisionRequestDto, GetRevisionRequestsDto, UpdateRevisionRequestDto } from '@ivt/a-state';
import { IvtCollectionResponse, RevisionRequest, User, UserRoles } from '@ivt/c-data';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RevisionRequestService } from '../services/revision-request.service';

@Controller('revision-requests')
@UseGuards(AuthGuard(), RolesGuard)
export class RevisionRequestController {
  constructor(private revisionRequestsService: RevisionRequestService) {}

  @Get()
  async getRevisionRequests(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetRevisionRequestsDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<RevisionRequest>> {
    return this.revisionRequestsService.getRevisionRequests(filterDto, user);
  }

  @Get(':id')
  async getRevision(@Param('id', ParseIntPipe) id: number): Promise<RevisionRequest> {
    return this.revisionRequestsService.getRevisionRequest(id);
  }

  @Post()
  @Roles(UserRoles.agencyUser)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRevisionRequest(
    @Body() createRevisionRequestDto: CreateRevisionRequestDto,
    @GetUser() user: Partial<User>
  ): Promise<RevisionRequest> {
    return this.revisionRequestsService.createRevisionRequest(createRevisionRequestDto, user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateRevisionRequest(
    @Body() updateRevisionRequestDto: UpdateRevisionRequestDto,
    @GetUser() user: Partial<User>
  ): Promise<RevisionRequest> {
    return this.revisionRequestsService.updateRevisionRequest(updateRevisionRequestDto, user);
  }
}
