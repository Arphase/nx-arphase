import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupEntity, GroupRepository } from '@ivt/a-state';
import { Connection } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';
import { dir } from '@ivt/c-utils';
import { Group } from '@ivt/c-data';

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

  async getGroupById(id: number): Promise<Group> {
    const query = this.groupRepository.createQueryBuilder('group');
    query
      .leftJoinAndSelect('group.companies', 'company')
      .leftJoinAndSelect('company.address', 'adress')
      .leftJoinAndSelect('company.users', 'user');

    const found = await query.where('group.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Group with id "${id}" not found`);
    }

    return found;
  }

  async getGroups(filterDto: Partial<GetGroupsFilterDto>): Promise<GroupEntity[]> {
    const { limit, offset, sort, direction, name } = filterDto;
    const query = this.groupRepository.createQueryBuilder('group');

    if (sort && direction) {
      query.orderBy(`${sort}`, dir[direction]);
    }

    if (name) {
      query.andWhere('LOWER(group.name) like :name', { name: `%${name.toLowerCase()}%` });
    }

    query.groupBy('group.id').take(limit).skip(offset);

    const groups = await query.getMany();
    return groups;
  }
}
