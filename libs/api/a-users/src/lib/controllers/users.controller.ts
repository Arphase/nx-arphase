import { GetUser } from '@ivt/a-auth';
import { User } from '@ivt/c-data';
import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FilterUsersDto } from '../dto/filter-users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query(new ValidationPipe({ transform: true })) filterDto: FilterUsersDto,
    @GetUser() user: Partial<User>
  ): Promise<User[]> {
    return this.usersService.getUsers(filterDto, user);
  }
}
