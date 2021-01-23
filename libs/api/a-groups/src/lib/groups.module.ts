import { AuthModule } from '@ivt/a-auth';
import { CompanyRepository, GroupRepository, UserRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, GroupRepository, UserRepository]), AuthModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
