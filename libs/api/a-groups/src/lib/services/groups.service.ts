import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupEntity, GroupRepository } from '@ivt/a-state';
import { Connection } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';
import { dir } from '@ivt/c-utils';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '@ivt/c-data';
import { AuthService } from '@ivt/a-auth';

@Injectable()
export class GroupsService {
  groupRepository: GroupRepository;

  constructor(private readonly connection: Connection, private authService: AuthService) {
    this.groupRepository = this.connection.getCustomRepository(GroupRepository);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = await this.groupRepository.create(createGroupDto);
    await newGroup.save();
    newGroup.companies?.forEach(company => {
      company.users?.forEach(user => {
        this.authService.sendEmailResetPassword(user.email);
      });
    });
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

  async getGroups(filterDto: Partial<GetGroupsFilterDto>): Promise<Group[]> {
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

  async updateGroup(updateGroupDto: UpdateGroupDto): Promise<Group> {
    const updatedGroup = await this.groupRepository.save(updateGroupDto);
    return updatedGroup;
  }
}
