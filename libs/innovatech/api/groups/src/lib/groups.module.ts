import { AuthDataModule } from '@innovatech/api/auth/data';
import { CompanyEntity, GroupEntity, ProductEntity, ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, GroupEntity, UserEntity, ResetPasswordEntity, ProductEntity]),
    AuthDataModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
