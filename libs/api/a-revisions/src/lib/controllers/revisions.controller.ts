import { Roles, RolesGuard } from '@ivt/a-auth';
import { UserRoles } from '@ivt/c-data';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { RevisionsService } from '../services/revisions.service';

@Controller('revisions')
@UseGuards(RolesGuard)
@Roles(UserRoles.superAdmin)
export class RevisionsController {
  constructor(private revisionsService: RevisionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createVehicle(@Body() createRevisionDto: CreateRevisionDto) {
    return this.revisionsService.createRevision(createRevisionDto);
  }
}
