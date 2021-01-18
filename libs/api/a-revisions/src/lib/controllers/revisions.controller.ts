import { Roles, RolesGuard } from '@ivt/a-auth';
import { Revision, UserRoles } from '@ivt/c-data';
import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { RevisionsService } from '../services/revisions.service';

@Controller('revisions')
@UseGuards(RolesGuard)
@Roles(UserRoles.superAdmin)
export class RevisionsController {
  constructor(private revisionsService: RevisionsService) {}

  @Get()
  async getRevisions(@Query(new ValidationPipe({ transform: true })) filterDto: GetRevisionsDto): Promise<Revision[]> {
    return this.revisionsService.getRevisions(filterDto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createVehicle(@Body() createRevisionDto: CreateRevisionDto) {
    return this.revisionsService.createRevision(createRevisionDto);
  }
}
