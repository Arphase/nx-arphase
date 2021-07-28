import { ApsCollectionResponse } from '@arphase/common';
import { Roles, RolesGuard } from '@innovatech/api/auth/data';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Group, Product, UserRoles } from '@innovatech/common/domain';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AssignProductsDto } from '../dto/assign-products.dto';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsService } from '../services/groups.service';

@Controller('groups')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  @Roles(UserRoles.superAdmin, UserRoles.repairman)
  async getGroups(@Query() filterDto: CommonFilterDto): Promise<ApsCollectionResponse<Group>> {
    return this.groupsService.getGroups(filterDto);
  }

  @Get(':id')
  @Roles(UserRoles.superAdmin)
  async getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  updateGroup(@Body() updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupsService.updateGroup(updateGroupDto);
  }

  @Put('assign/products')
  @Roles(UserRoles.superAdmin)
  assignProducts(@Body() assignProductsDto: AssignProductsDto): Promise<Product[]> {
    return this.groupsService.assignProducts(assignProductsDto);
  }
}
