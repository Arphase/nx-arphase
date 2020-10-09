import { Injectable } from '@nestjs/common';
import { GroupEntity, GroupRepository } from '@ivt/a-state';
import { Connection } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class GroupsService {
  groupRepository: GroupRepository;

  constructor(private readonly connection: Connection) {
    this.groupRepository = this.connection.getCustomRepository(GroupRepository);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const newGroup = await this.groupRepository.create(createGroupDto);
    await newGroup.save();
    return newGroup;
  }
}
