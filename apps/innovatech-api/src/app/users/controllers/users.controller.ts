import {
  Controller,
  Query,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
  Put,
  Body
} from '@nestjs/common';
import { UserEntity } from '../data/user.entity';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@api/auth/decorators/get-user.decorator';
import { User } from '@innovatech/data';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('search')
  // getSearchUsers(@Query('search') search: string): Promise<UserEntity[]> {
  //   return this.usersService.getSearchUsers(search);
  // }

  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
  //   return this.usersService.getUserById(id);
  // }

  // @Patch()
  // updateUser(
  //   @Body('userBody') userBody: Partial<User>,
  //   @GetUser() user: Partial<User>
  // ): Promise<UserEntity> {
  //   return this.usersService.updateUser(user, userBody);
  // }
}
