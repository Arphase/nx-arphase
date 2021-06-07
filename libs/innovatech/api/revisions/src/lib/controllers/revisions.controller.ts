import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { IvtCollectionResponse, Revision, User, UserRoles } from '@innovatech/common/domain';
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
import { AuthGuard } from '@nestjs/passport';

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
    @Query(new ValidationPipe({ transform: true })) filterDto: GetRevisionsDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Revision>> {
    return this.revisionsService.getRevisions(filterDto, user);
  }

  @Get(':id')
  async getRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.getRevision(id);
  }

  @Post()
  @Roles(UserRoles.superAdmin, UserRoles.repairman)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRevision(@Body() createRevisionDto: CreateRevisionDto) {
    return this.revisionsService.createRevision(createRevisionDto);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateRevision(@Body() updateRevisionDto: UpdateRevisionDto): Promise<Revision> {
    return this.revisionsService.updateRevision(updateRevisionDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  async deleteRevision(@Param('id', ParseIntPipe) id: number): Promise<Revision> {
    return this.revisionsService.deleteRevision(id);
  }
}
