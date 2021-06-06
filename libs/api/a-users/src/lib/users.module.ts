import { AuthDataModule } from '@innovatech/api/auth/data';
import { UserRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthDataModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
