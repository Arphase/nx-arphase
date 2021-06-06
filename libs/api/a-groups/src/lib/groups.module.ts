import { AuthDataModule, ResetPasswordRepository } from '@innovatech/api/auth/data';
import { CompanyRepository, GroupRepository, ProductRepository, UserRepository } from '@ivt/a-state';
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
