import { AuthModule } from '@ivt/a-auth';
import { UserRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
