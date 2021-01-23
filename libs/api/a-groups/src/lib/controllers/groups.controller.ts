import { Roles, RolesGuard } from '@ivt/a-auth';
import { CreateGroupDto, GetGroupsFilterDto, UpdateGroupDto } from '@ivt/a-state';
import { Group, UserRoles } from '@ivt/c-data';
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

import { GroupsService } from '../services/groups.service';

@Controller('groups')
@UseGuards(AuthGuard(), RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  @UsePipes(new ValidationPipe({ transform: true }))
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  @Roles(UserRoles.superAdmin)
  async getGroups(@Query(ValidationPipe) filterDto: GetGroupsFilterDto): Promise<Group[]> {
    return this.groupsService.getGroups(filterDto);
  }

  @Get(':id')
  @Roles(UserRoles.superAdmin)
  async getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateGroup(@Body() updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupsService.updateGroup(updateGroupDto);
  }
}
