import { AuthDataModule } from '@innovatech/api/auth/data';
import {
  CompanyRepository,
  GroupRepository,
  ProductRepository,
  ResetPasswordRepository,
  UserRepository,
} from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      GroupRepository,
      UserRepository,
      ResetPasswordRepository,
      ProductRepository,
    ]),
    AuthDataModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
