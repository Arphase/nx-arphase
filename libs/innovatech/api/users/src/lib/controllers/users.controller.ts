import { ApsCollectionResponse } from '@arphase/common';
import { GetUser } from '@innovatech/api/auth/data';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { User } from '@innovatech/common/domain';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query() filterDto: CommonFilterDto,
    @GetUser() user: Partial<User>,
  ): Promise<ApsCollectionResponse<User>> {
    return this.usersService.getUsers(filterDto, user);
  }
}
