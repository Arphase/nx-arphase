import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupsService } from '../services/groups.service';
import { Group } from '@ivt/c-data';
import { RolesGuard } from '@ivt/a-auth';
import { AuthGuard } from '@nestjs/passport';
import { GroupEntity } from '@ivt/a-state';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';

@Controller('groups')
@UseGuards(AuthGuard(), RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  async getGuarantees(@Query(ValidationPipe) filterDto: GetGroupsFilterDto): Promise<GroupEntity[]> {
    return this.groupsService.getGroups(filterDto);
  }

  @Get(':id')
  async getGuarantee(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }
}
