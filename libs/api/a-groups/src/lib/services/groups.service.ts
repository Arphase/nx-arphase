import { AuthService } from '@ivt/a-auth';
import { GroupRepository } from '@ivt/a-state';
import { Group } from '@ivt/c-data';
import { dir } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { flatten } from 'lodash';
import { Connection } from 'typeorm';

import { CreateGroupDto } from '../dto/create-group.dto';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupsService {
  groupRepository: GroupRepository;

  constructor(private readonly connection: Connection, private authService: AuthService) {
    this.groupRepository = this.connection.getCustomRepository(GroupRepository);
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

  async getGroups(filterDto: Partial<GetGroupsFilterDto>): Promise<Group[]> {
    const { limit, offset, sort, direction, text } = filterDto;
    const query = this.groupRepository.createQueryBuilder('group');

    if (sort && direction) {
      query.orderBy(`${sort}`, dir[direction]);
    }

    if (text) {
      query.andWhere(
        `LOWER(group.name) like :name OR
         LOWER(group.contact) like :name  OR
         LOWER(group.email) like :name OR
         LOWER(group.phone) like :name`,
        { name: `%${text.toLowerCase()}%` }
      );
    }

    query.groupBy('group.id').take(limit).skip(offset);

    const groups = await query.getMany();
    return groups;
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = await this.groupRepository.create(createGroupDto);
    await newGroup.save();
    newGroup.companies?.forEach(company =>
      company.users?.forEach(user => this.authService.sendEmailResetPassword(user.id))
    );
    return newGroup;
  }

  async updateGroup(updateGroupDto: UpdateGroupDto): Promise<Group> {
    const updatedGroup = await this.groupRepository.save(updateGroupDto);
    const userIds: number[] = flatten(updatedGroup.companies.map(company => company.users.map(user => user.id)));
    this.authService.sendEmailToPendingUsers(userIds);
    return updatedGroup;
  }
}
