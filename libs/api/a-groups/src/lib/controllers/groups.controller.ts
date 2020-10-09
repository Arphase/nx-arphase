import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupsService } from '../services/groups.service';
import { Group } from '@ivt/c-data';
import { RolesGuard } from '@ivt/a-auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('groups')
@UseGuards(AuthGuard(), RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }
}
