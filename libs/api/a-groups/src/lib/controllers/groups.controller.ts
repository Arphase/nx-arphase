import { Body, Controller, Get, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupsService } from '../services/groups.service';
import { Group } from '@ivt/c-data';
import { RolesGuard } from '@ivt/a-auth';
import { AuthGuard } from '@nestjs/passport';
import { GroupEntity } from '@ivt/a-state';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

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
  async getGroups(@Query(ValidationPipe) filterDto: GetGroupsFilterDto): Promise<GroupEntity[]> {
    return this.groupsService.getGroups(filterDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateGroup(@Body() updateGroupDto: UpdateGroupDto): Promise<GroupEntity> {
    return this.groupsService.updateGroup(updateGroupDto);
  }
}
