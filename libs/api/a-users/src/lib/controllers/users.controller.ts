import { GetUser } from '@ivt/a-auth';
import { User } from '@ivt/c-data';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(@GetUser() user: Partial<User>): Promise<User[]> {
    return this.usersService.getUsers(user);
  }
}
