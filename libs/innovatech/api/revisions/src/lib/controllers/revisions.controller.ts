import { ApsCollectionResponse } from '@arphase/common';
import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { Revision, User, UserRoles } from '@innovatech/common/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { UpdateRevisionDto } from '../dto/update-revision.dto';
import { RevisionsService } from '../services/revisions.service';

@Controller('revisions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RevisionsController {
  constructor(private revisionsService: RevisionsService) {}

  @Get()
  async getRevisions(
    @Query() filterDto: GetRevisionsDto,
    @GetUser() user: Partial<User>,
  ): Promise<ApsCollectionResponse<Revision>> {
    return this.revisionsService.getRevisions(filterDto, user);
  }

  @Get(':id')
  async getRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.getRevision(id);
  }

  @Get('export/excel')
  async getRevisionsExcel(
    @Query() filterDto: GetRevisionsDto,
    @GetUser() user: Partial<User>,
    @Res() response: Response,
  ): Promise<void> {
    return this.revisionsService.getRevisionsExcel(filterDto, user, response);
  }

  @Post()
  @Roles(UserRoles.superAdmin, UserRoles.repairman)
  async createRevision(@Body() createRevisionDto: CreateRevisionDto) {
    return this.revisionsService.createRevision(createRevisionDto);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  updateRevision(@Body() updateRevisionDto: UpdateRevisionDto): Promise<Revision> {
    return this.revisionsService.updateRevision(updateRevisionDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  async deleteRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.deleteRevision(id);
  }
}
