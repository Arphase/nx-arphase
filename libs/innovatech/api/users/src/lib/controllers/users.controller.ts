import { GetUser } from '@innovatech/api/auth/data';
import { IvtCollectionResponse, User } from '@innovatech/common/domain';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query(new ValidationPipe({ transform: true })) filterDto: CommonFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<User>> {
    return this.usersService.getUsers(filterDto, user);
  }
}
