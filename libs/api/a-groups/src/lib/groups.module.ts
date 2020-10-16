import { AuthModule } from '@ivt/a-auth';
import { GroupRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository]), AuthModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [],
})
export class GroupsModule {}
