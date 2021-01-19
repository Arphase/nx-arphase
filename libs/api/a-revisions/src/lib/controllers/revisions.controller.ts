import { Roles, RolesGuard } from '@ivt/a-auth';
import { Revision, UserRoles } from '@ivt/c-data';
import {
  Body,
  Controller,
  Delete,
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

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { UpdateRevisionDto } from '../dto/update-revision.dto';
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

  @Get(':id')
  async getRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.getRevision(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRevision(@Body() createRevisionDto: CreateRevisionDto) {
    return this.revisionsService.createRevision(createRevisionDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateRevision(@Body() updateRevisionDto: UpdateRevisionDto): Promise<Revision> {
    return this.revisionsService.updateRevision(updateRevisionDto);
  }

  @Delete(':id')
  async deleteRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.deleteRevision(id);
  }
}
